import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { PaginationService } from '../../services/pagination-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './pagination-tasks.component.html',
})
export class PaginationTasksComponent {


  pages = input<number>(0)

  currentPage = input<number>(1)

  activePage = linkedSignal(this.currentPage);

  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });

 }
