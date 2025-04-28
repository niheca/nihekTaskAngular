import { Routes } from '@angular/router';
import dashboardRoutes from './dashboard/dashboard.routes';
import { HomePageComponent } from './home/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path:"",
    component: HomePageComponent
  },
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard/dashboard.routes")
  },

  {
    path: "**",
    redirectTo: ""
  }
];
