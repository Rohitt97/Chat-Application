import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box>
      <Typography variant="h1">Welcome to ChatZone</Typography>
      <Link to={"/auth/signup"}>
        <Button
          sx={{
            backgroundColor: "#000",
            "&:hover": {
              backgroundColor: "#000",
            },
            color: "#fff",
          }}
        >
          Get Started
        </Button>
      </Link>
    </Box>
  );
}
