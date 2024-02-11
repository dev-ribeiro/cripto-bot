import { useState } from "react"

type Props<T> = {
  data: T[] | undefined;
}

export function usePaginator<T>({ data }: Props<T>) {
  const items = data ?? [];

  const itemsPerPage = 10;

  const [offset, setOffset] = useState(0);

  const endOffset = offset + itemsPerPage;

  const currentItems = items.slice(offset, endOffset);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const updateOffset = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setOffset(newOffset);
  }

  return {
    currentItems,
    pageCount,
    updateOffset
  }
}
