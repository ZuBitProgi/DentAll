import React from "react";
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import { Index } from "./screens/Index";
import HousingAdminView from "./screens/HousingAdminView";
import UserAdminView from "./screens/UserAdminView";
import TransportAdminView from "./screens/TransportAdminView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/users",
        element: <UserAdminView />
    },
    {
        path: "/transport",
        element: <TransportAdminView />
    },
    {
        path: "/housing",
        element: <HousingAdminView />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

export const baseUrl = "http://localhost:8080";
