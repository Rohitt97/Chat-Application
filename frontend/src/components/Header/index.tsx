import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";
import { deleteCookie } from "../../utils/helper";

export default function Header() {
  const { authUser, setAuthUser } = useAuth();

  const handleSignout = () => {
    setAuthUser();
    deleteCookie("accessToken");
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" color={"#fff"} sx={{ flexGrow: 1 }}>
            Chat Application
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Stack direction={"row"} spacing={2}>
              <MuiLink component={Link} to="/" color="inherit">
                Home
              </MuiLink>
            </Stack>
            {authUser ? (
              <Button
                onClick={handleSignout}
                variant="outlined"
                sx={{
                  color: "#D3D3D3",
                  borderColor: "#D3D3D3",
                  "&:hover": {
                    backgroundColor: "rgba(211, 211, 211, 0.1)",
                    borderColor: "#D3D3D3",
                  },
                }}
              >
                Signout
              </Button>
            ) : (
              <Stack direction={"row"} spacing={2}>
                <MuiLink component={Link} to="/auth/signin" color="inherit">
                  Signin
                </MuiLink>
                <MuiLink component={Link} to="/auth/signup" color="inherit">
                  Signup
                </MuiLink>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
