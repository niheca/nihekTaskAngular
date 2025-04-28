import { Injectable, signal } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { v4 as uuidv4 } from 'uuid';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

const emptyTask:Task = {
  id: 'new',
  completed: false,
  title: '',
  description: '',
  importance: '',
  dueDate: ''
}

@Injectable({providedIn: 'root'})
export class TaskService {

  private taskMapCache = signal<Map<string,Task>>(new Map<string,Task>())

  private taskArrayCache = signal<Task[]>([])

  private task$ = toObservable(this.taskArrayCache)

  getTasks():Observable<Task[]>{

    return this.task$

  }

  getTaskById(id:string):Observable<Task>{

    if(id === 'new'){

      return of(emptyTask)

    }

    return of(this.taskMapCache().get(id)!)

  }

  createTask(task:Task):Observable<Task>{

    task.id = uuidv4()
    task.createdAt = new Date(Date.now())


    return of(task).pipe(
      tap((task) => this.saveTaskCache(task)),
      tap((task) => console.log("Tarea creada" , {task} )),
    )

  }

  saveTaskCache(task:Task){

    this.taskArrayCache.update( current => [ ...current , task ])

    this.taskMapCache.update(current => new Map([ ...current , [ task.id , task ] ]))

  }

  updateTask(task:Task):Observable<Task>{

    this.updateTaskCache(task)

    return of(this.taskMapCache().get(task.id)!).pipe(
      tap((task) => console.log("Tarea actualizada : " , this.taskMapCache().get(task.id)))
    )

  }

  updateTaskCache(task:Task){

    this.taskMapCache.update(current => new Map([ ...current , [ task.id , task ] ]))

    const taskArrayCacheUpdated = this.taskArrayCache().map((currentTask) => {

      return (currentTask.id === task.id) ? task : currentTask

    })

    this.taskArrayCache.update(current => taskArrayCacheUpdated)

  }

  markAsCompleted(taskId:string){
    this.getTaskById(taskId).pipe(
      map( (task) => {
        const updatedTask = { ...task, completed: !task.completed };
        this.updateTaskCache(updatedTask);
        return updatedTask;
      }),
      switchMap(updatedTask => this.updateTask(updatedTask))
    ).subscribe();
  }

  deleteTask(taskId:string):Observable<boolean>{


    try {
      this.taskMapCache.update(current => {
        const newMap = new Map(current);
        newMap.delete(taskId);
        return newMap;
      });

      // Eliminar del Array
      this.taskArrayCache.update(current =>
        current.filter(task => task.id !== taskId)
      );
      return of(true)
    } catch (error) {
      return of(false)
    }
  }

}
