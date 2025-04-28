import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { TableTasksComponent } from "../../components/table-tasks/table-tasks.component";
import { TaskService } from '../../services/task-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-list-task-page',
  imports: [TableTasksComponent],
  templateUrl: './list-task-page.component.html',
})
export class ListTaskPageComponent  {

  taskService = inject(TaskService)

  tasksResource = rxResource({
    request:() => ({}),
    loader: ({request}) => {

      return this.taskService.getTasks().pipe(

        tap((tasks)=> console.log("tasks" , {tasks}))

      )

    }
  })

}
