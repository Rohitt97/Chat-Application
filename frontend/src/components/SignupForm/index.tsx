import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";
import { signupUser } from "../../services/authService";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data: FormValues) => {
    const userData = await signupUser(data);
    if (userData) {
      setAuthUser(userData);
      navigate("/auth/verify-account");
    }
  };
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            type="name"
            placeholder="enter your name here"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            type="email"
            placeholder="enter your email here"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            type="password"
            placeholder="enter your password here"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
              },
              maxLength: {
                value: 8,
                message: "Password can be only 8 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            sx={{
              backgroundColor: "#000",
              "&:hover": {
                backgroundColor: "#000",
              },
              color: "#fff",
            }}
            onClick={handleSubmit(handleSignup)}
          >
            Signup
          </Button>
          <Typography variant="body1">
            Already have an Account
            <Link to={"/auth/signin"}>Login</Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
