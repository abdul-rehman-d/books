export function parseBook(book: RawBook): Book {
  return {
    id: book.id,
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
    publisher: book.volumeInfo.publisher,
    publishedDate: book.volumeInfo.publishedDate,
    description: book.volumeInfo.description,
    pageCount: book.volumeInfo.pageCount,
    thumbnail: book.volumeInfo.imageLinks?.thumbnail,
  };
}
