export interface Task {
  /**
   * Identificador único de la tarea (útil para tracking y operaciones)
   */
  id?: string;

  /**
   * Título principal de la tarea
   */
  title: string;

  /**
   * Descripción o subtítulo adicional de la tarea (aparece como badge)
   */
  description: string;
  /**
   * Fecha de creación de la tarea (opcional)
   */
  created: number;

  /**
   * Fecha límite para completar la tarea (opcional)
   */
  expiration: number;

  /**
   * Nivel de importancia de la tarea
   * Puede ser un color o nivel de prioridad
   */
  importance: string;

  /**
   * Indica si la tarea ha sido completada/realizada
   */
  completed: boolean;

}

export interface TaskResponse {
  count:number,
  pages:number,
  tasks:Task[]
}

export interface Options {

  limit?:number,
  offset?:number

}
