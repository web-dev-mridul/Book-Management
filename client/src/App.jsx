import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { IconBooks } from "@tabler/icons-react";
import { IconBook } from "@tabler/icons-react";
import { IconCirclePlus } from "@tabler/icons-react";

const API_URL = "https://my-server-rho.vercel.app/books";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // new books
  const handleAddBook = async (bookData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
      const newBook = await response.json();

      if (response.ok) {
        setBooks((prevBooks) => [newBook, ...prevBooks]);
        toast.success("Book added successfully!");
      } else {
        toast.error(newBook.error || "Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book");
    }
  };

  // delete
  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        toast.success("Book deleted successfully!");
      } else {
        toast.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };

  // update
  const handleToggleRead = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
      });
      const updatedBook = await response.json();

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === id ? updatedBook : book)),
        );
        toast.success("Status updated!");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating book status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-yellow-950">
      {/* navbar */}
      <nav className="mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl text-amber-300">
              <IconBooks stroke={1.5} className="size-8" />
            </span>
            <span className="font-semibold text-xl text-amber-300">
              BookShelf
            </span>
          </div>
          <div className="text-sm text-amber-100">Personal Reading Journey</div>
        </div>
      </nav>
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-300 flex justify-center gap-2">
            <IconBook stroke={2} className="size-10" />
            BookShelf Manager
          </h1>
          <p className="text-amber-100 mt-1">
            Keep track of your personal reading journey
          </p>
        </header>

        {/* responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* left side book form */}
          <div className="bg-amber-50 p-6 rounded-xl shadow-sm lg:sticky lg:top-8">
            <div className="flex gap-2">
              <div>
                <IconCirclePlus stroke={2} className="size-12 text-yellow-900"/>
              </div>
              <div className=" mb-4">
                <h2 className="text-xl font-semibold text-yellow-900">
                  Add New Book
                </h2>
                <p className="text-yellow-700 text-sm">
                  Keep track of your personal reading journey
                </p>
              </div>
            </div>
            <BookForm onAddBook={handleAddBook} />
          </div>

          {/* right side book list */}
          <div className="lg:col-span-2 bg-yellow-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-yellow-900 mb-4 flex justify-center items-center">
              <IconBooks stroke={1.75} className="size-8" />Your Books
            </h2>
            {loading ? (
              <div className="text-center py-12 text-yellow-700">
                Loading books...
              </div>
            ) : (
              <BookList
                books={books}
                onDelete={handleDeleteBook}
                onToggleRead={handleToggleRead}
              />
            )}
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
