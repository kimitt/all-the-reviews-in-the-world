import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axios";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { setAccessToken, setCSRFToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location?.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  async function onSubmitForm(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "auth/login/",
        JSON.stringify({
          email,
          password
        })
      );

      setAccessToken(response?.data?.access_token);
      setCSRFToken(response.headers["x-csrftoken"]);
      setEmail();
      setPassword();
      setLoading(false);

      navigate(fromLocation, { replace: true });
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center flex-col">
      <h2 className="flex justify-center mt-8 font-han text-3xl">로그인</h2>
      <form onSubmit={onSubmitForm}>
        <div className="flex justify-center mt-5">
          <input
            type="email"
            placeholder="Email"
            className="w-[350px] bg-slate-200 rounded-[20px] py-2 pl-4"
            id="email"
            onChange={onEmailChange}
          />
        </div>
        <div className="flex justify-center mt-5">
          <input
            type="password"
            placeholder="Password"
            className="w-[350px] bg-slate-200 rounded-[20px] py-2 pl-4"
            id="password"
            onChange={onPasswordChange}
          />
        </div>
        <div className="flex justify-center mt-5">
          <button
            disabled={loading}
            className="w-[350px] bg-black text-white rounded-[20px] p-2"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
