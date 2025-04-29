import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'importance'
})

export class ImportanceLevel implements PipeTransform {
  transform(importance:string ): any {
    switch (importance) {
      case 'Baja':
        return 'bg-success';
      case 'Media':
        return 'bg-warning';
      case 'Alta':
        return 'bg-red-500';
      default:
        return '';
    }
  }
}
