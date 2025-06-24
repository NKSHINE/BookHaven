# BookHaven - Digital Bookstore

A modern, full-featured e-commerce bookstore built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Book Catalog**: Browse books with advanced filtering and search
- **Shopping Cart**: Add/remove items with persistent storage
- **Wishlist**: Save favorite books for later
- **User Authentication**: Login/register with form validation
- **Book Details**: Comprehensive book information and reviews
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bookhaven
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Books/          # Book-related components
│   ├── Cart/           # Shopping cart components
│   └── Layout/         # Layout components (Header, Footer)
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   ├── CartContext.tsx # Shopping cart state
│   └── WishlistContext.tsx # Wishlist state
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── BookDetail.tsx  # Book detail page
│   ├── Books.tsx       # Books catalog page
│   ├── Home.tsx        # Homepage
│   └── Wishlist.tsx    # Wishlist page
├── data/               # Mock data
├── types/              # TypeScript type definitions
└── App.tsx             # Main app component
```

## 🚀 Deployment

The project is deployed on Netlify: [Live Demo](https://zingy-zuccutto-3413ec.netlify.app)

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features Overview

### Authentication
- User registration and login
- Form validation with React Hook Form
- Persistent authentication state
- Protected routes

### Book Catalog
- Grid and list view options
- Advanced filtering (genre, author, price, rating)
- Search functionality
- Sorting options
- Pagination

### Shopping Cart
- Add/remove items
- Quantity management
- Persistent cart state
- Cart sidebar with smooth animations

### Wishlist
- Save favorite books
- Move items to cart
- Persistent wishlist state

### Book Details
- Comprehensive book information
- Image gallery
- Related books suggestions
- Reviews and ratings

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette (primary, secondary, accent)
- Extended spacing and typography
- Custom animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [Pexels](https://pexels.com/) - Stock photos for book covers

## 📞 Support

If you have any questions or need help, please open an issue or contact the maintainers.

---

Made with ❤️ by [Your Name]