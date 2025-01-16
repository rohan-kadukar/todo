import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  tasks: Task[] = [];
  completionRate: number = 0;
  categoryDistribution: { [key: string]: number } = {};
  priorityDistribution: { [key: string]: number } = {};
  averageCompletionTime: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.calculateMetrics();
    });
  }

  private calculateMetrics() {
    const completedTasks = this.tasks.filter(task => task.completed);
    this.completionRate = (completedTasks.length / this.tasks.length) * 100;

    // Calculate category distribution
    this.categoryDistribution = this.tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate priority distribution
    this.priorityDistribution = this.tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const completionTimes = completedTasks
      .map(task => {
        const created = task.createdAt.getTime();
        const updated = task.updatedAt.getTime();
        return (updated - created) / (1000 * 60 * 60 * 24); // Convert to days
      });

    this.averageCompletionTime = completionTimes.length
      ? completionTimes.reduce((a, b) => a + b) / completionTimes.length
      : 0;
  }

  // Add the objectKeys method
  objectKeys(obj: object): string[] {
    return Object.keys(obj);
  }
}
