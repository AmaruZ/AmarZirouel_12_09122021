import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import UserProfile from './pages/User';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './utils/styles/GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <GlobalStyle />
      <Header />
      <SideBar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
