import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (book: any) => {
    addToCart(book);
    removeFromWishlist(book._id);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save books you're interested in to your wishlist so you can easily find them later.
            </p>
            <Link
              to="/books"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">{items.length} books saved</p>
          </div>
          <button
            onClick={clearWishlist}
            className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
              <div className="relative">
                <Link to={`/books/${book._id}`}>
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(book._id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <Link to={`/books/${book._id}`}>
                  <h3 className="font-semibold text-gray-900 mb-1 hover:text-primary-600 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-2">
                  by {book.author.join(', ')}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary-600">
                      ${book.discountPrice ? book.discountPrice.toFixed(2) : book.price.toFixed(2)}
                    </span>
                    {book.discountPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${book.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    book.stock > 0 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {book.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(book)}
                  disabled={book.stock === 0}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    book.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{book.stock === 0 ? 'Out of Stock' : 'Move to Cart'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;