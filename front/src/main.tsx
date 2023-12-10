import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import MainLayOut from "./layouts/MainLayout/MainLayout.tsx";
import SettingsLayOut from "./layouts/SettingsLayout/SettingsLayout.tsx";
import ServicesLayout from "./layouts/ServicesLayout/ServicesLayout.tsx";
//

// components
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";
import Profile from "./components/Profile/Profile.tsx";
import ServiceBlock from "./components/ServiceBlock/ServiceBlock.tsx";
import WelcomeSettings from "./components/WelcomeSettings/WelcomeSettings.tsx";
import LogIn from "./components/Registration/Log_in/Log_in.tsx";
import SignUp from "./components/Registration/Sign_up/Sing_up.tsx";
import Assets from "./components/Assets/Assets.tsx";
import RolesAuthRoute from "./util_components/RolesAuthRoute.tsx";
import ForceToRegistrate from "./components/ForceToRegistrate/ForceToRegistrate.tsx";
import NotRegistratedRoute from "./util_components/NotRegistratedRoute.tsx";
import Tracking from "./components/Tracking/Tracking.tsx";
//

// redux
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
//

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "/Assets/:id",
        element: <Assets />
      },
      {
        path: "/Services",
        element: (
          // change roles auth route
          <NotRegistratedRoute path="force_to_login">
            <ServicesLayout />
          </NotRegistratedRoute>
        ),
        children: [
          {
            path: "/Services/:id",
            element: <ServiceBlock />
          },
          {
            path: "*",
            element: <div>Error</div>
          }
        ]
      },
      {
        path: "/Tracking",
        element: (
          <RolesAuthRoute path="page_not_found">
            <Tracking />
          </RolesAuthRoute>
        )
      },
      {
        path: "/Settings",
        element: <SettingsLayOut />,
        children: [
          { path: "/Settings", element: <WelcomeSettings /> },
          {
            path: "/Settings/Profile",
            element: (
              <NotRegistratedRoute path="force_to_login">
                <Profile />
              </NotRegistratedRoute>
            )
          },
          {
            path: "*",
            element: <div>In development...</div>
          }
        ]
      },
      {
        path: "/force_to_login",
        element: <ForceToRegistrate />
      },
      {
        path: "*",
        element: (
          <ErrorPage
            title_text="404 NOT FOUND"
            error_text="Your visited page not found. You may go home page"
          />
        )
      }
    ]
  },
  {
    path: "/registration",
    element: <LogIn />
  },
  {
    path: "/sign_up",
    element: <SignUp />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
