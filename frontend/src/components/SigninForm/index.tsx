import { Card, CardContent, Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { signinUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";

type FormValues = {
  email: string;
  password: string;
};

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const handleSignin = async (data: FormValues) => {
    try {
      const userData = await signinUser(data);
      if (userData) {
        setAuthUser(userData.user);
        navigate("/dashboard/chat-window");
      }
    } catch {
      alert("User not found with the provided credentials");
    }
  };
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            type="email"
            placeholder="enter you email here."
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            type="password"
            placeholder="enter your password here."
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
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
            onClick={handleSubmit(handleSignin)}
          >
            Signin
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
