import './App.css';
import './assets/scss/global.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import ProtectedRoute from './helpers/protected-route';

import Home from "./pages/home";
import Header from './components/header';
import Footer from './components/footer';
import Login from './pages/login';
import Painel from './pages/painel/painel';
import PageCreatePost from './pages/painel/criarPost';
import PageEditPost from './pages/painel/editarPost';
import PostList from './components/postList';
import SinglePost from './pages/single';

function App() {
  return (
    <div className='main' >      
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/painel" element={ <ProtectedRoute> <Painel /> </ProtectedRoute>} />
          <Route path="/criar-post" element={<ProtectedRoute> <PageCreatePost /> </ProtectedRoute>} />
          <Route path="/painel/editar/:slug" element={<ProtectedRoute> <PageEditPost /> </ProtectedRoute>} />
          <Route path="/post/:slug" element={<SinglePost />} />
      </Routes>
      <Footer />
      
    </div>


  );
}

export default App;
