import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { TableTasksComponent } from "../../components/table-tasks/table-tasks.component";
import { TaskService } from '../../services/task-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, startWith, tap } from 'rxjs';
import { PaginationTasksComponent } from "../../components/pagination-tasks/pagination-tasks.component";
import { PaginationService } from '../../services/pagination-service';

@Component({
  selector: 'app-list-task-page',
  imports: [TableTasksComponent, PaginationTasksComponent],
  templateUrl: './list-task-page.component.html',
})
export class ListTaskPageComponent  {

  taskService = inject(TaskService)
  paginationService = inject(PaginationService)

  tasksResource = rxResource({
    request:() => ({page: this.paginationService.currentPage() - 1 ,limit:8}),
    loader: ({request}) => {
      return this.taskService.getTasks({
        limit:request.limit,
        offset:request.page * request.limit
      })
    }
  })



}
