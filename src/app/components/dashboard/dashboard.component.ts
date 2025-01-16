import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  urgentTasks: Task[] = [];
  completedTasks: number = 0;
  totalTasks: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.urgentTasks = tasks.filter(task => !task.completed && task.priority === 'High');
      this.completedTasks = tasks.filter(task => task.completed).length;
      this.totalTasks = tasks.length;
    });
  }
}
