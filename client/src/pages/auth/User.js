import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

export default function User() {
  const { user, setUser } = useAuth();
  const axiosPrivateInstance = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();
  const [loading, setLoading] = useState(false);

  async function onLogout() {
    setLoading(true);

    await logout();
    navigate("/");
  }

  useEffect(() => {
    async function getUser() {
      const { data } = await axiosPrivateInstance.get("auth/user");
      setUser(data);
    }

    getUser();
  }, []);

  return (
    <div className="flex justify-center flex-col w-[400px]  mx-auto">
      <div className="flex justify-center flex-col items-center h-[180px] mt-[40px] border-[1px] border-black p-3">
        <h3 className="font-bold text-sm p-1 flex flex-row">
          {user?.username}{" "}
          <p className="font-semibold pl-1 text-[0.8rem]">리뷰어</p>
        </h3>
        <h4>{user?.email}</h4>
        <button
          disabled={loading}
          type="button"
          onClick={onLogout}
          className="w-[150px] bg-black text-white rounded-[20px] p-2 mt-5"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
