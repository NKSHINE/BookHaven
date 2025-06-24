import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones, Bookmark } from 'lucide-react';
import BookGrid from '../components/Books/BookGrid';
import { mockBooks } from '../data/mockData';

const Home: React.FC = () => {
  const featuredBooks = mockBooks.filter(book => book.featured);
  const bestSellers = mockBooks.filter(book => book.bestSeller);
  const newArrivals = mockBooks.filter(book => book.newArrival);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
                Discover Your Next
                <span className="block text-accent-300">Favorite Book</span>
              </h1>
              <p className="text-xl text-primary-100 leading-relaxed">
                Explore thousands of books across all genres. From bestsellers to hidden gems, 
                find your perfect read at BookHaven.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/books"
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Browse Books
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/bestsellers"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors"
                >
                  View Bestsellers
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="Book 1"
                    className="w-full h-64 object-cover rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300"
                  />
                  <img
                    src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="Book 2"
                    className="w-full h-48 object-cover rounded-lg shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="Book 3"
                    className="w-full h-48 object-cover rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                  />
                  <img
                    src="https://images.pexels.com/photos/1834401/pexels-photo-1834401.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="Book 4"
                    className="w-full h-64 object-cover rounded-lg shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600 via-transparent to-transparent opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Truck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Headphones className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Customer support available anytime</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Bookmark className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      {featuredBooks.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Books</h2>
                <p className="text-gray-600">Handpicked selections from our editors</p>
              </div>
              <Link
                to="/books?featured=true"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <BookGrid books={featuredBooks.slice(0, 4)} />
          </div>
        </section>
      )}

      {/* Bestsellers */}
      {bestSellers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Bestsellers</h2>
                <p className="text-gray-600">Most popular books this month</p>
              </div>
              <Link
                to="/books?bestseller=true"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <BookGrid books={bestSellers.slice(0, 4)} />
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
                <p className="text-gray-600">Latest additions to our collection</p>
              </div>
              <Link
                to="/books?new=true"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <BookGrid books={newArrivals.slice(0, 4)} />
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new releases, 
            special offers, and exclusive deals.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;