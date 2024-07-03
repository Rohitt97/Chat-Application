import { axios } from "../config/axios";

export default async function getAllChats() {
  const response = await axios.get("/users");
  return response.data;
}

export async function getUserChat(id: string) {
  const response = await axios.get(`/user-chat/:${id}`);
  return response.data;
}
