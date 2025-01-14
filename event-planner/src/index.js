import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Importing necessary router functions
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import LoginForm from './components/LoginForm';



const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "signup",
        element: <SignupForm />
      },
      {
        path: "login",
        element: <LoginForm />
      }
    ]
  },

])
root.render(
  <React.StrictMode>
        <RouterProvider router={router} />  

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
