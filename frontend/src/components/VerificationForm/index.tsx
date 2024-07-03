import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import { verifyUser } from "../../services/authService";
import { useAuth } from "../AuthProvider/AuthContext";
import { useNavigate } from "react-router-dom";

type FormValues = {
  verificationCode: string;
};

const VerificationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (code: FormValues) => {
    const verificationData = await verifyUser(code);
    if (verificationData) {
      alert("User Verified Successfully");
      setAuthUser(verificationData);
      navigate("/dashboard/chat-window");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          type="verificationCode"
          placeholder="type you code here"
          {...register("verificationCode", {
            required: "verification Code is required",
            minLength: {
              value: 4,
              message: "verification Code must be atleast 4 characters",
            },
            maxLength: { value: 4, message: "verification must be 4 digits" },
          })}
          error={!!errors.verificationCode}
          helperText={errors.verificationCode?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{
            backgroundColor: "#000",
            "&:hover": {
              backgroundColor: "#000",
            },
            color: "#fff",
          }}
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default VerificationForm;
