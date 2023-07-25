import { useQuery } from "react-query";
import api from "../services/api";
import { parseBook } from "../utils/parsing";

async function getAllBooks() {
  const response = await api.get("/volumes?q=subject:inspirational&maxResults=20");
  if (response.status === 200) {
    const books: Book[] = response.data.items.map(parseBook);
    return books;
  }
  return [];
}

const useBooks = () => useQuery<Book[], Error>("books", getAllBooks);

export default useBooks;
