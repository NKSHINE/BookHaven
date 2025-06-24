import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  ArrowLeft,
  Share2,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Book, Review } from '../types';
import { mockBooks, mockReviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import BookGrid from '../components/Books/BookGrid';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    content: ''
  });

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (id) {
      // Mock API call
      const foundBook = mockBooks.find(b => b._id === id);
      if (foundBook) {
        setBook(foundBook);
        setReviews(mockReviews.filter(r => r.book === id));
      }
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book, quantity);
    }
  };

  const handleWishlistToggle = () => {
    if (book) {
      if (isInWishlist(book._id)) {
        removeFromWishlist(book._id);
      } else {
        addToWishlist(book);
      }
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, submit review to API
    console.log('Review submitted:', reviewData);
    setShowReviewForm(false);
    setReviewData({ rating: 5, title: '', content: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
          <button
            onClick={() => navigate('/books')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  const discountPercentage = book.discountPrice 
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : 0;

  const relatedBooks = mockBooks.filter(b => 
    b._id !== book._id && 
    b.genre.some(g => book.genre.includes(g))
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button
            onClick={() => navigate('/books')}
            className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Books</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Book Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Images */}
            {book.additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {book.additionalImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index + 1)}
                    className={`aspect-square bg-white rounded-lg shadow-sm overflow-hidden border-2 ${
                      selectedImage === index + 1 ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${book.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            {/* Title and Author */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600">by {book.author.join(', ')}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {book.averageRating} ({book.totalRatings} ratings)
              </span>
              <span className="text-sm text-gray-600">
                {book.totalReviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary-600">
                  ${book.discountPrice ? book.discountPrice.toFixed(2) : book.price.toFixed(2)}
                </span>
                {book.discountPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${book.price.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Free shipping on orders over $50
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                book.stock > 10 ? 'bg-green-500' : book.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className={`text-sm font-medium ${
                book.stock > 10 ? 'text-green-700' : book.stock > 0 ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {book.stock > 10 ? 'In Stock' : book.stock > 0 ? `Only ${book.stock} left` : 'Out of Stock'}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {book.genre.map((genre) => (
                <span
                  key={genre}
                  className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={book.stock === 0}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    book.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleWishlistToggle}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isInWishlist(book._id)
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(book._id) ? 'fill-current' : ''}`} />
                  <span>{isInWishlist(book._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button className="py-3 px-6 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-primary-600" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-primary-600" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Book Details Tabs */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button className="py-4 border-b-2 border-primary-600 text-primary-600 font-medium">
                  Details
                </button>
                <button className="py-4 text-gray-500 hover:text-gray-700">
                  Reviews ({reviews.length})
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Information</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Publisher:</dt>
                      <dd className="font-medium">{book.publisher}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">ISBN:</dt>
                      <dd className="font-medium">{book.isbn}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Pages:</dt>
                      <dd className="font-medium">{book.pages}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Language:</dt>
                      <dd className="font-medium">{book.language}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Format:</dt>
                      <dd className="font-medium capitalize">{book.format}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Published:</dt>
                      <dd className="font-medium">
                        {new Date(book.publishedDate).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Details</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Dimensions:</dt>
                      <dd className="font-medium">
                        {book.dimensions.length}" × {book.dimensions.width}" × {book.dimensions.height}"
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Weight:</dt>
                      <dd className="font-medium">{book.weight} lbs</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Books</h2>
            <BookGrid books={relatedBooks} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;