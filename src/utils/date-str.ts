import { format } from 'src/utils/format';

export function toDateStr(date: Date) {
  return format('%4d%2d%2d000000', [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ]);
}
