import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Dashboard/Calendar.tsx';
import Customers from './pages/Dashboard/Customers.tsx';
import Orders from './pages/Dashboard/Orders.tsx';
import Drivers from './pages/Dashboard/Drivers.tsx';
import Prices from './pages/Dashboard/Prices.tsx';
import Settings from './pages/Dashboard/Settings.tsx';
import Confirm from './pages/Dashboard/Links/Confirm.tsx';
import Cancel from './pages/Dashboard/Links/Cancel.tsx';
import Pending from './pages/Dashboard/Links/Pending.tsx';
import Edit from './pages/Dashboard/Links/Edit.tsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([

  {
    path: "/",
    element: <Dashboard />,
    children:[
      {
        index: true,
        element: <Calendar />,
      },
      {
        path: "Customers",
        element: <Customers />,
      },

      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "drivers",
        element: <Drivers />,
      },
      {
        path: "prices",
        element: <Prices />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ]
  },
  {
    path: "/confirm/:id",
    element: <Confirm />,
  },
  {
    path: "/cancel/:id",
    element: <Cancel />,
  },
  {
    path: "/pending/:id",
    element: <Pending />,
  },
  {
    path: "/editOrder/:id",
    element: <Edit />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
