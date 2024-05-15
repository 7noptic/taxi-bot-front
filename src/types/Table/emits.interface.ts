export interface TableEmits {
  (event: 'selectPage', value: number): void;

  (event: 'update'): void;
}
