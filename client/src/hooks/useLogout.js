import { axiosPrivateInstance } from "../api/axios";
import useAuth from "./useAuth";

export default function useLogout() {
  const { setUser, setAccessToken, setCSRFToken } = useAuth();

  const logout = async () => {
    try {
      const response = await axiosPrivateInstance.post("auth/logout/");

      setAccessToken(null);
      setCSRFToken(null);
      setUser({});
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  return logout;
}
