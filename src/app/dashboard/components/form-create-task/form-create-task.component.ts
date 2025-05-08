import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Task } from '../../../interfaces/task.interface';
import { FormErrorLabelComponent } from "../../../shared/form-error-label/form-error-label.component";
import { TaskService } from '../../services/task-service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'form-create-task',
  imports: [ReactiveFormsModule, FormErrorLabelComponent],
  providers: [DatePipe],
  templateUrl: './form-create-task.component.html',
})
export class FormCreateTaskComponent implements OnInit {



  fb = inject(FormBuilder)
  taskService = inject(TaskService)
  router = inject(Router)

  datePipe = inject(DatePipe)

  task = input.required<Task>()


  taskForm = this.fb.group({
    title:["",[Validators.required]],
    description:["",[Validators.required,Validators.minLength(10)]],
    importance:["",[Validators.required]],
    expiration:["",[Validators.required,]],
  })

  ngOnInit(): void {
    this.taskForm.patchValue({
      title: this.task().title,
      description: this.task().description,
      importance: this.task().importance,
      expiration: this.datePipe.transform(this.task().expiration, 'yyyy-MM-dd'),
    })
  }

  onSubmit(){

    const isValid = this.taskForm.valid
    this.taskForm.markAllAsTouched()

    const taskFormValue: Task = {
      ...this.task(),
      title: this.taskForm.value.title || '',
      description: this.taskForm.value.description || '',
      importance: this.taskForm.value.importance || '',
      expiration: Number(this.taskForm.value.expiration) || 0 ,
    };



    if(!isValid) return

    const taskUpdated: Partial<Task> = {
      ...(taskFormValue as any),
    };

    const id = this.task().id

    if(this.task().id === 'new'){
      //Crear Producto
      this.taskService.createTask(taskFormValue).subscribe()
    }
    else {
      //Actualizar
      console.log(taskUpdated)
      this.taskService.updateTask(taskFormValue.id!,taskUpdated).subscribe()
    }

    this.router.navigateByUrl("/dashboard/list-tasks")

  }

  deleteTask(){
    this.taskService.deleteTask(this.task().id!)
    this.router.navigateByUrl("/dashboard/list-tasks")
  }

  cancel(){
    this.router.navigateByUrl("/dashboard/list-tasks")
  }
 }
