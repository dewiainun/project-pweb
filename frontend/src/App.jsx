import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import ItemDetail from './components/ItemDetail';
import CategoryManager from './components/CategoryManager';

// Constants
const NAV_ITEMS = [
  { 
    path: '/', 
    label: 'Daftar',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  { 
    path: '/add', 
    label: 'Tambah',
    icon: 'M12 4v16m8-8H4'
  },
  { 
    path: '/categories', 
    label: 'Kategori',
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
  }
];

const STYLES = {
  activeLink: 'px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-500 text-white shadow-md',
  inactiveLink: 'px-4 py-2 rounded-lg font-medium transition duration-200 text-gray-700 hover:bg-gray-100'
};

// Components
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const NavLink = ({ item, isActive }) => (
  <Link to={item.path} className={isActive ? STYLES.activeLink : STYLES.inactiveLink}>
    <span className="flex items-center gap-2">
      <Icon path={item.icon} />
      {item.label}
    </span>
  </Link>
);

function Navigation() {
  const location = useLocation();
  
  const checkIsActive = (path) => {
    return path === '/' 
      ? location.pathname === '/' 
      : location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-3">
        {NAV_ITEMS.map((item) => (
          <NavLink 
            key={item.path} 
            item={item} 
            isActive={checkIsActive(item.path)} 
          />
        ))}
      </div>
    </nav>
  );
}

const Header = () => (
  <header className="mb-8">
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-blue-500">
      <div className="flex items-center justify-center mb-3">
        <Icon 
          path="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          className="w-12 h-12 text-blue-500 mr-3"
        />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Museum Digital
        </h1>
      </div>
      <p className="text-gray-600 text-lg">
        Simpan dan kenangan dan momen berharga
      </p>
    </div>
  </header>
);

const Footer = () => (
  <footer className="mt-12 text-center">
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-600">
        © 2025 Museum Digital Barang Kenangan
      </p>
    </div>
  </footer>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ItemList />} />
    <Route path="/add" element={<ItemForm />} />
    <Route path="/edit/:id" element={<ItemForm editMode />} />
    <Route path="/item/:id" element={<ItemDetail />} />
    <Route path="/categories" element={<CategoryManager />} />
  </Routes>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <Navigation />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}