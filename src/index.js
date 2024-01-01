import React from 'react';
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import {QueryClient , QueryClientProvider } from 'react-query'

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import reportWebVitals from './reportWebVitals';
import './index.css'


import App from './App';

if(process.env.NODE_ENV ===  'production') disableReactDevTools()

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
    <App/>
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
