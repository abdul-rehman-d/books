# Books
## A simple two-screen cross platform app to display a list of books and their details.

This app uses [Google Books API](https://www.googleapis.com/books/v1/) for a list of books and their details. These books are queried for Fantasy genre and sorted by most recent publication date.

### Features
- A list of books with their front covers displayed in masonary layout with option to refresh and incrementally fetch paginated response.
- A detail screen for each book with a cover image, title, author, publication date, and description.
- A custom hook for fetching data from the API by a pre decided max limit, as well as refreshing and fetching the next same amount of books when scrolled near the bottom.
- Shared Element Transition for the book cover image between the list and detail screen. And additional animations for the title and description.

### Screenshots
#### Books List Screen with Masonary Layout
![Books List Screen](/screenshots/books-list.jpg "Books List Screen")
#### Book Detail Screen
![Book Detail Screen](/screenshots/book-detail.jpg "Book Detail Screen")
#### Smooth Page Change Animation with Shared Element Transition and Animated Title and Description
![Shared Element Transition](/screenshots/shared-element.gif "Shared Element Transition")
