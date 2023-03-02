import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  function onUsernameChange(event) {
    setUsername(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  function onPasswordConfirmationChange(event) {
    setPasswordConfirm(event.target.value);
  }

  async function onSubmitForm(event) {
    event.preventDefault();
    console.log("click");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "auth/register/",
        JSON.stringify({
          username,
          email,
          password,
          passwordConfirm
        })
      );

      setEmail();
      setPassword();
      setUsername();
      setPasswordConfirm();
      setLoading(false);

      navigate("/auth/login");
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center flex-col">
      <h2 className="flex justify-center mt-8 font-han text-3xl">회원가입</h2>
      <form onSubmit={onSubmitForm}>
        <div className="flex justify-center mt-5">
          <input
            type="text"
            placeholder="Username"
            className="w-[350px] bg-slate-200 rounded-[20px] py-2 pl-4"
            id="username"
            onChange={onUsernameChange}
          />
        </div>
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-[350px] bg-slate-200 rounded-[20px] py-2 pl-4"
            id="passwordConfirm"
            onChange={onPasswordConfirmationChange}
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
