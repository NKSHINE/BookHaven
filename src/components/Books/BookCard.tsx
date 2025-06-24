import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Book } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, className = '' }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(book._id)) {
      removeFromWishlist(book._id);
    } else {
      addToWishlist(book);
    }
  };

  const discountPercentage = book.discountPrice 
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : 0;

  return (
    <div className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}>
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
          -{discountPercentage}%
        </div>
      )}

      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        {book.featured && (
          <span className="bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </span>
        )}
        {book.bestSeller && (
          <span className="bg-accent-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            Bestseller
          </span>
        )}
        {book.newArrival && (
          <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            New
          </span>
        )}
      </div>

      <Link to={`/books/${book._id}`} className="block">
        {/* Book Cover */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist(book._id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-50'
                }`}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(book._id) ? 'fill-current' : ''}`} />
              </button>
              <Link
                to={`/books/${book._id}`}
                className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            by {book.author.join(', ')}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(book.averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              ({book.totalRatings})
            </span>
          </div>

          {/* Price */}
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
              book.stock > 10 
                ? 'bg-green-100 text-green-800'
                : book.stock > 0
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {book.stock > 10 ? 'In Stock' : book.stock > 0 ? `${book.stock} left` : 'Out of Stock'}
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-3">
            {book.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
            {book.genre.length > 2 && (
              <span className="text-xs text-gray-500">
                +{book.genre.length - 2} more
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={book.stock === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
            book.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;