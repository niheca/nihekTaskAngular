import { Component, inject, input, signal } from '@angular/core';
import { Task } from '../../../interfaces/task.interface';
import { ImportanceLevel } from '@shared//pipes/importance-pipe';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'table-tasks',
  imports: [
    ImportanceLevel,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './table-tasks.component.html',
})
export class TableTasksComponent {

  tasks = input<Task[]>([])


  taskService = inject(TaskService)

}
