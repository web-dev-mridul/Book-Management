import  { useState } from 'react';
import toast from 'react-hot-toast';
import { IconBook } from '@tabler/icons-react';
import { IconArrowNarrowRight } from '@tabler/icons-react';
const BookForm = ({onAddBook}) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")


        const handleSubmit = (e) => {
            e.preventDefault()

            if(!title.trim()  || !author.trim()) return
           
            onAddBook({title, author})

            toast.success("book saved successfully")
            setTitle("")
            setAuthor("")
        }

    return (
     <form onSubmit={handleSubmit} className="p-4 rounded-xl border-2 border-yellow-700">
      <div className="space-y-3">
        {/* title */}
        <div className='mb-5'>
          <label className="block text-yellow-900 text-md font-semibold mb-1">
            Book Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
            className="w-full px-3 py-1.5 text-sm border border-yellow-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-900 focus:border-transparent"
          />
        </div>
        {/* author */}
        <div>
          <label className="block text-yellow-900 text-md font-semibold mb-1">
            Book Author <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter book author"
            required
            className="w-full px-3 py-1.5 text-sm border border-yellow-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-900 focus:border-transparent"
          />
        </div>
        {/* button */}
        <button 
          type="submit" 
          className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-700 transition-colors text-yellow-800 hover:text-yellow-50 font-medium text-sm py-2 px-4 rounded-lg mt-2 flex justify-center items-center gap-3"
        ><IconBook stroke={2} />
          Add Book
          <IconArrowNarrowRight stroke={2} />
        </button>
      </div>
    </form>
    );
};

export default BookForm;