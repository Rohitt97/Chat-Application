import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../components/AuthProvider";

export default function SoloLayout() {
  return (
    <AuthProvider>
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </AuthProvider>
  );
}
