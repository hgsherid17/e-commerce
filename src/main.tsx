import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// SRC: Contexts - https://legacy.reactjs.org/docs/context.html

const stripe = loadStripe('pk_test_51PfQVNJyX9kTwHpnF6XHj3YwT3TTJnjSnJgGGxBAiMN7sBZStlX0DjR1IG7XYHVrBUK92mTsVHnvcmowu8zsCA2300QaNWapvJ');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <BrowserRouter>
      <Elements stripe={stripe}>
        <App />
      </Elements>
    </BrowserRouter>
  </React.StrictMode>,
)
