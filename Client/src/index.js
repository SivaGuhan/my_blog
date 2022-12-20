import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './components/home';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Toolbar from './components/toolbar';
import AddArticle from './components/addArticle';
import Footer from './components/footer';
import About from './components/about';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Toolbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddArticle />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
