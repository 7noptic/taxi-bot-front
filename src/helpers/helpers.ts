import { exportFile, Notify, QTableColumn } from 'quasar';

export const wrapCsvValue = (
  val: string,
  formatFn?: (val: string, row: any) => any,
  row?: any
) => {
  let formatted = formatFn !== void 0 && row ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
};

export const exportTable = async (columns: QTableColumn[], data: any[]) => {
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      data.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(',')
      )
    )
    .join('\r\n');

  const status = exportFile('table-export.csv', content, 'text/csv');

  if (status !== true) {
    Notify.create({
      message: 'Ошибка скачивания файла..',
      color: 'negative',
      timeout: 1000,
      icon: 'warning',
    });
  }
};
