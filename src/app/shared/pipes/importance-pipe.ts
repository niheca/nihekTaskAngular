import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'importance'
})

export class ImportanceLevel implements PipeTransform {
  transform(importance:string ): any {
    switch (importance) {
      case 'Baja':
        return 'bg-success';      // Fondo verde (Bootstrap)
      case 'Media':
        return 'bg-warning';      // Fondo amarillo/naranja (Bootstrap)
      case 'Alta':
        return 'bg-red-500';       // Fondo rojo (Bootstrap)
      default:
        return '';                // Sin fondo si no coincide
    }
  }
}
