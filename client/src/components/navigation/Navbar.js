import React from "react";
import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { accessToken, user } = useAuth();

  return (
    <nav className="flex w-full">
      <div className="flex flex-row justify-between items-center w-full p-2 border-b-[1px] border-black ">
        <div className="nav-item font-title ">
          <NavLink to="/">세상의 모든 리뷰</NavLink>
        </div>
        <ul className="navbar-nav me-auto mb-lg-0 flex flex-row justify-between items-center">
          {!accessToken ? (
            <>
              <li className="nav-item p-1 text-sm">
                <NavLink to="/auth/login">Login</NavLink>
              </li>
              <li className="nav-item p-1 text-sm">
                <NavLink to="/auth/register">Register</NavLink>
              </li>
            </>
          ) : (
            <>
              <div className="items-center">
                <p className="font-bold text-[0.8rem] px-2">
                  {user?.username} 리뷰어님! 환영합니다
                </p>
              </div>

              <li className="nav-item p-1 text-sm">
                <NavLink to="/auth/user">Mypage</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
