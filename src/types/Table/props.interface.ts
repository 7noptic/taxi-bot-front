import { PaginationType } from 'src/types/query.type';
import { ModeTable } from 'src/types/mode.table';

export interface TableProps<S> {
  list: S;
  hiddenFields?: string[];
  pagination?: PaginationType;
  mode?: ModeTable;
  loading?: boolean;
}
