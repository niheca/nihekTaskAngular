import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
