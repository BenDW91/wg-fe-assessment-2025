import { useMemo } from 'react';

export type SortDirection = 'asc' | 'desc';

export function useSortBy<T>(
  items: readonly T[],
  sortBy: keyof T,
  direction: SortDirection = 'asc'
): T[] {
  return useMemo(() => {
    if (!Array.isArray(items)) {
      console.warn('useSortBy: expected an array, got', items);
      return [];
    }

    // Create a shallow copy to avoid mutating original array
    const result = [...items];

    result.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      // Compare values (supports strings, numbers, Dates)
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      return 0;
    });

    return result;
  }, [items, sortBy, direction]);
}
