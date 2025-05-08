import { inject, Injectable, signal } from '@angular/core';
import { Options, Task, TaskResponse } from '../../interfaces/task.interface';
import { v4 as uuidv4 } from 'uuid';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

const emptyTask:Task = {
  id: 'new',
  completed: false,
  title: '',
  description: '',
  importance: '',
  expiration: Date.now(),
  created: 0
}

type taskWithoutID = Omit<Task, 'id'>;

@Injectable({providedIn: 'root'})
export class TaskService {

  private http = inject(HttpClient)

  createTask(task:Task):Observable<Task>{

    const taskRequest:taskWithoutID = {
      title: task.title,
      description: task.description,
      created: Date.now(),
      expiration: Date.parse(task.expiration.toString()),
      importance : task.importance.toUpperCase(),
      completed : task.completed
    }

    console.log({taskRequest})

    return this.http.post<Task>(environment.BASE_URL+environment.CREATE , taskRequest)
    .pipe(
      tap((task) => console.log("Tarea creada :" + {task})),
    )

  }

  getTasks(options:Options):Observable<TaskResponse>{

    const { limit = 0 , offset = 0 } = options

    return this.http.get<TaskResponse>(environment.BASE_URL + environment.GET , {
      params: {
        limit,
        offset
      }
    })

  }

  getTaskById(taskID:string):Observable<Task>{

    if(taskID ===  "new") return of(emptyTask)

    return this.http.get<Task>(`${environment.BASE_URL}${environment.GET}/${taskID}`)

  }

  updateTask(taskID:string,updates:Partial<Task>):Observable<Task>{

    return this.http.patch<Task>(`${environment.BASE_URL}${environment.UPDATE}/${taskID}`,updates)
    //return of()
  }

  deleteTask(taskID:string):Observable<Boolean>{

    return this.http.delete<Boolean>(`${environment.BASE_URL}${environment.DELETE}/${taskID}`)

  }

}
