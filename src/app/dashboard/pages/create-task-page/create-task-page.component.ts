import { Component, inject } from '@angular/core';
import { FormCreateTaskComponent } from "../../components/form-create-task/form-create-task.component";
import { TaskService } from '../../services/task-service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-task-page',
  imports: [FormCreateTaskComponent],
  templateUrl: './create-task-page.component.html',
})
export class CreateTaskPageComponent {

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  taskService = inject(TaskService)

  productId = toSignal(this.activatedRoute.params.pipe(
    map(({id}) => id)
    )
  )

  taskResource = rxResource({
    request: () => ({id:this.productId()}),
    loader: ({request}) => {
      return this.taskService.getTaskById(request.id)
    }
  })

}
