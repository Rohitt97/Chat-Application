import { axios } from "../config/axios";

export async function signupUser(signupUserDetail: any) {
  try {
    const response = await axios.post("/auth/signup", signupUserDetail);
    return response.data;
  } catch (error: any) {
    alert(`error: ${error.response?.data.message}`);
  }
}

export async function signinUser(userData: any) {
  try {
    const response = await axios.post("/auth/signin", userData);
    return response.data;
  } catch (error: any) {
    alert(`error: ${error.response?.data.data.message}`);
  }
}

export async function verifyUser(verificationCode: any) {
  try {
    const response = await axios.post("/auth/verify-account", verificationCode);
    return response.data;
  } catch (error: any) {
    alert(`error: ${error.response?.data.message}`);
  }
}

export async function getAuthUser() {
  const response = await axios.get("/auth/user");
  return response.data;
}
