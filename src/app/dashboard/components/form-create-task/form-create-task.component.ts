import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Task } from '../../../interfaces/task.interface';
import { FormErrorLabelComponent } from "../../../shared/form-error-label/form-error-label.component";
import { TaskService } from '../../services/task-service';
import { Router } from '@angular/router';

@Component({
  selector: 'form-create-task',
  imports: [ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './form-create-task.component.html',
})
export class FormCreateTaskComponent implements OnInit {

  fb = inject(FormBuilder)
  taskService = inject(TaskService)
  router = inject(Router)

  task = input.required<Task>()

  taskForm = this.fb.group({
    title:["",[Validators.required]],
    description:["",[Validators.required,Validators.minLength(10)]],
    importance:["",[Validators.required]],
    dueDate:["",[Validators.required,]],
  })

  ngOnInit(): void {
    //console.log(this.task())
    this.taskForm.patchValue({
      title: this.task().title,
      description: this.task().description,
      importance: this.task().importance,
      dueDate: this.task().dueDate,
    })
  }

  onSubmit(){

    const isValid = this.taskForm.valid
    this.taskForm.markAllAsTouched()

    const updatedTask: Task = {
      ...this.task(),
      title: this.taskForm.value.title || '',
      description: this.taskForm.value.description || '',
      importance: this.taskForm.value.importance || '',
      dueDate: this.taskForm.value.dueDate || ''
    };

    if(!isValid) return

    const id = this.task().id

    if(this.task().id === 'new'){
      //Crear Producto
      console.log("CREAR")
      this.taskService.createTask(updatedTask).subscribe()
    }
    else {
      //Actualizar
      this.taskService.updateTask(updatedTask).subscribe()
    }

    this.router.navigateByUrl("/dashboard/list-tasks")

  }

  deleteTask(){
    this.taskService.deleteTask(this.task().id)
    this.router.navigateByUrl("/dashboard/list-tasks")
  }

  cancel(){
    this.router.navigateByUrl("/dashboard/list-tasks")
  }
 }
