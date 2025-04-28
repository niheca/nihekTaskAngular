import { Routes } from "@angular/router";
import { TaskLayoutComponent } from "./layout/task-layout/task-layout.component";
import { ListTaskPageComponent } from "./pages/list-task-page/list-task-page.component";
import { CreateTaskPageComponent } from "./pages/create-task-page/create-task-page.component";

export const dashboardRoutes:Routes = [

  {
    path: "",
    component: TaskLayoutComponent,
    children: [
      {
        //lista de tareas
        path: "list-task",
        component: ListTaskPageComponent,
        title: "List Of Task"
      },
      {
        //Modificar tarea
        path: "create-task/:id",
        component: CreateTaskPageComponent,
        title: "Modify a Task"
      },
      {
        path: "**",
        redirectTo: "/dashboard/list-task"
      }
    ]
  },


]

export default dashboardRoutes
