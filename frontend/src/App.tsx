import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import SoloLayout from "./layouts/SoloLayout";
import { DefaultLayout } from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import VerificationPage from "./pages/VerificationPage";
import AuthLayout from "./layouts/AuthLayout";
import ChatWindow from "./pages/ChatWindow";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { mainTheme } from "./theme";
import { Page } from "./components/Page";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Page PageComponent={HomePage} />
          </div>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <SoloLayout />,
    children: [
      {
        path: "/auth/signin",
        element: <Page PageComponent={SigninPage} />,
      },
      {
        path: "/auth/signup",
        element: <Page PageComponent={SignupPage} />,
      },
      {
        path: "/auth/verify-account",
        element: (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Page PageComponent={VerificationPage} />
          </div>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard/chat-window",
        element: <Page PageComponent={ChatWindow} />,
      },
    ],
  },
]);

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={createTheme(mainTheme)}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
