import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: string[] = ['Work', 'Personal', 'Urgent'];
  priorities: string[] = ['Low', 'Medium', 'High'];
  selectedCategory: string = 'all';
  selectedPriority: string = 'all';
  searchTerm: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const categoryMatch = this.selectedCategory === 'all' || task.category === this.selectedCategory;
      const priorityMatch = this.selectedPriority === 'all' || task.priority === this.selectedPriority;
      const searchMatch = task.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return categoryMatch && priorityMatch && searchMatch;
    });
  }

  toggleTaskComplete(task: Task): void {
    const updatedTask = { 
      ...task, 
      completed: !task.completed,
      progress: task.completed ? 0 : 100
    };
    this.taskService.updateTask(task.id!, updatedTask);
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }
}
