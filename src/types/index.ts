export interface Book {
  _id: string;
  title: string;
  author: string[];
  publisher: string;
  isbn: string;
  genre: string[];
  language: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  coverImage: string;
  additionalImages: string[];
  pages: number;
  publishedDate: string;
  format: 'hardcover' | 'paperback' | 'ebook';
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  averageRating: number;
  totalRatings: number;
  totalReviews: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  status: 'active' | 'inactive' | 'out-of-stock';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
  isPremium: boolean;
  premiumExpiry?: string;
  addresses: Address[];
  wishlist: string[];
  orderHistory: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  _id?: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
  addedAt: string;
}

export interface Order {
  _id: string;
  user: string;
  orderNumber: string;
  items: {
    book: Book;
    quantity: number;
    price: number;
    discountPrice?: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  book: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minimumAmount: number;
  maximumDiscount: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  applicableCategories: string[];
  createdAt: string;
}