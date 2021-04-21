import { writable } from 'svelte/store';

export default writable({
  rowCount: 5,
  rowMargin: 28,
  rowHeight: 14,
  colCount: 6,
  colWidth: 14,
});
