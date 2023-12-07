import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

import Login from './Components/login';
import CreateAccount from './Components/auth/createAccount/createAccount';
import SessionLayout from './Components/Session/SessionOverview/Layout/SessionLayout';
import SessionControl from './Components/sessionControl';
import AddEntity from './Components/AddEntity';
import EditEntity from './Components/EditEntity';
import AttackControl from './Components/AttackControl';

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
        path: "/session/:userID/:sessionId",
        element: <SessionLayout></SessionLayout>
    },
    {
        path: "/sessionControl/:userID",
        element: <SessionControl></SessionControl>
    },
    {
        path: "/addEntity",
        element: <AddEntity></AddEntity>
    },
    {
        path: "/editEntity",
        element: <EditEntity></EditEntity>
    },
    {
        path: "/attack/:sessionId",
        element: <AttackControl></AttackControl>
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
