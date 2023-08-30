import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // dyanmic URL routing

import AllPosts from './pages/AllPosts';
import SinglePost from './pages/SinglePost';
import Footer from './Footer';
import Header from './Header';

// environment variables
require('dotenv').config();

// Use the createRoot API to render your app
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); 

root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Header />
    <Routes> {/*AllPosts is basically index.html */}
      <Route exact path="/" element={<AllPosts />} />
      <Route path='/posts/:slug' element={<SinglePost />} />
    </Routes>
  <Footer />
  </BrowserRouter>
  </React.StrictMode>

);
