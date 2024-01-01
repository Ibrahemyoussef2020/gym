import React from 'react';
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import {QueryClient , QueryClientProvider } from 'react-query'
import reportWebVitals from './reportWebVitals';
import './index.css'

import App from './App';

/*
const router = createBrowserRouter([
  {
    path:'/home',
    element:<HomePage />
  },
  {
    path:'dashboard-layout',
    element:<DashboardLayout />,
    children:[
      {
        path:'dashboard',
        element:<Dashboard />,
        index:true
      },
      {
        path:'admin-profile',
        element:<Admin_Profile />,
      },
      {
        path:'plan',
        element:<Plan />
      },
      {
        path:'inventory',
        element:<Inventory />
      },
      {
        path:'view-members',
        element:<View_Members />
      },
      {
        path:'coaches',
        element:<Coaches />
      },
      {
        path:'report',
        element:<Report />
      }
    ]
  },
  {
    path:'sign-in',
    element:<SignIn />
  },
  {
    path:'/',
    element:<SignUp />
  }
])
*/

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
