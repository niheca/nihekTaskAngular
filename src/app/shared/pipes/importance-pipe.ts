import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'importance'
})

export class ImportanceLevel implements PipeTransform {
  transform(importance:string ): any {
    switch (importance) {
      case 'BAJA':
        return 'bg-success';
      case 'MEDIA':
        return 'bg-warning';
      case 'ALTA':
        return 'bg-red-500';
      default:
        return '';
    }
  }
}
