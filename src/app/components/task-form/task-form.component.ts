import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  categories: string[] = ['Work', 'Personal', 'Urgent'];
  priorities: string[] = ['Low', 'Medium', 'High'];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      priority: ['Medium', Validators.required],
      dueDate: ['', Validators.required],
      recurring: [false],
      recurringType: ['daily'],
      recurringInterval: [1],
      tags: ['']
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task = {
        ...formValue,
        completed: false,
        progress: 0,
        tags: formValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag),
        recurring: formValue.recurring ? {
          type: formValue.recurringType,
          interval: formValue.recurringInterval
        } : undefined
      };

      this.taskService.addTask(task).then(() => {
        this.taskForm.reset({
          priority: 'Medium',
          recurring: false,
          recurringType: 'daily',
          recurringInterval: 1
        });
      });
    }
  }
}
