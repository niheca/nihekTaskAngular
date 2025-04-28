export interface Task {
  /**
   * Indica si la tarea ha sido completada/realizada
   */
  completed: boolean;

  /**
   * Título principal de la tarea
   */
  title: string;

  /**
   * Descripción o subtítulo adicional de la tarea (aparece como badge)
   */
  description: string;

  /**
   * Nivel de importancia de la tarea
   * Puede ser un color o nivel de prioridad
   */
  importance: string;

  /**
   * Identificador único de la tarea (útil para tracking y operaciones)
   */
  id: string;

  /**
   * Fecha de creación de la tarea (opcional)
   */
  createdAt?: Date;

  /**
   * Fecha límite para completar la tarea (opcional)
   */
  dueDate: string;
}
