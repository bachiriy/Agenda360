import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task, Status } from '../../core/models/task.model';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  completionChart: any;
  statusChart: any;

  stats = {
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    overdue: 0,
    completionRate: 0
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.calculateStats();
      this.initializeCharts();
    });
  }

  private calculateStats(): void {
    const now = new Date();
    this.stats.total = this.tasks.length;
    this.stats.completed = this.tasks.filter(t => t.status === Status.DONE).length;
    this.stats.inProgress = this.tasks.filter(t => t.status === Status.DOING).length;
    this.stats.notStarted = this.tasks.filter(t => t.status === Status.TODO).length;
    this.stats.overdue = this.tasks.filter(t => new Date(t.dueDate) < now && t.status !== Status.DONE).length;
    this.stats.completionRate = this.stats.total ? (this.stats.completed / this.stats.total) * 100 : 0;
  }

  private initializeCharts(): void {
    this.createCompletionChart();
    this.createStatusChart();
  }

  private createCompletionChart(): void {
    const ctx = document.getElementById('completionChart') as HTMLCanvasElement;
    this.completionChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
          data: [this.stats.completionRate, 100 - this.stats.completionRate],
          backgroundColor: ['#10B981', '#EF4444']
        }]
      }
    });
  }

  private createStatusChart(): void {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    this.statusChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Not Started', 'In Progress', 'Completed', 'Overdue'],
        datasets: [{
          data: [
            this.stats.notStarted,
            this.stats.inProgress,
            this.stats.completed,
            this.stats.overdue
          ],
          backgroundColor: ['#9CA3AF', '#FBBF24', '#10B981', '#EF4444']
        }]
      }
    });
  }
} 