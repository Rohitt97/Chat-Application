import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { AuthProvider } from "../../components/AuthProvider";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}
