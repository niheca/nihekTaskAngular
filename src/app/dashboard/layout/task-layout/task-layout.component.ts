import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@shared//footer/footer.component';
import { NavbarComponent } from '@shared//navbar/navbar.component';


@Component({
  selector: 'app-task-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './task-layout.component.html',
})
export class TaskLayoutComponent { }
