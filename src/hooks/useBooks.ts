import React, { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { parseBook } from "../utils/parsing";

const MAX_RESULTS = 20;

async function getAllBooks(startIndex: number) {
  const response = await api.get(
    "/volumes?q=subject:inspirational" +
    "&maxResults="+ MAX_RESULTS +
    "&startIndex=" + startIndex
  );
  if (response.status === 200) {
    const books: Book[] = response.data.items
      .map(parseBook)
      .filter((book: Book) => Boolean(book.thumbnail));
    return { books, totalItems: response.data.totalItems };
  }
  return { books: [], totalItems: Number.MAX_SAFE_INTEGER };
}

const useBooks = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
  const [ isFetchingNext, setIsFetchingNext ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ startIndex, setStartIndex ] = useState<number>(0);
  const [ books, setBooks ] = useState<Book[]>([]);
  const [ totalItems, setTotalItems ] = useState<number>(0);

  const handleFetch = useCallback(
    (
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      nextStartingIndex: number
    ) => {
      setLoading(true);
      getAllBooks(nextStartingIndex)
        .then(
          ({ books, totalItems }: { books: Book[]; totalItems: number }) => {
            if (nextStartingIndex === 0) {
              setBooks(books);
            } else {
              setBooks((curr) => [...curr, ...books]);
            }
            setStartIndex(nextStartingIndex + MAX_RESULTS);
            setTotalItems(totalItems);
            setLoading(false);
          }
        )
        .catch(() => {
          setLoading(false);
          setIsError(true);
        });
    },
    []
  );


  const fetchNext = useCallback(() => {
    if (!isFetchingNext) {
      console.log("fetching next", startIndex, totalItems);
      if (startIndex < totalItems) {
        handleFetch(setIsFetchingNext, startIndex);
      }
    }
  }, [isFetchingNext, startIndex, totalItems])

  const refresh = useCallback(() => {
    console.log("refreshing");
    handleFetch(setIsRefreshing, 0);
  }, []);

  useEffect(() => {
    console.log("fetching first time");
    handleFetch(setIsLoading, 0);
  }, []);

  return {
    books,
    isLoading,
    isError,
    isRefreshing,
    isFetchingNext,
    fetchNext,
    refresh,
  }
};

export default useBooks;
