import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

import Login from './Components/login';
import CreateAccount from './Components/auth/createAccount/createAccount';
import SessionLayout from './Components/Session/SessionOverview/Layout/SessionLayout';
import SessionControl from './Components/sessionControl';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>
    },
    {
        path: "/createAccount",
        element: <CreateAccount></CreateAccount>
    },
    {
        path: "/session/:sessionId",
        element: <SessionLayout></SessionLayout>
    },
    {
        path: "/sessionControl",
        element: <SessionControl></SessionControl>
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
