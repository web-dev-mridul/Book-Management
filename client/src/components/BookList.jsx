import BookItem from './BookItem';

const BookList = ({ books, onDelete, onToggleRead }) => {
  if (books.length === 0) {
    return <p className="text-center text-yellow-700 mt-4">No books in your shelf yet. Add one above!</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-yellow-800">My Reading List</h2>
      {books.map((book) => (
        <BookItem key={book.id} book={book} onDelete={onDelete} onToggleRead={onToggleRead} />
      ))}
    </div>
  );
};

export default BookList;