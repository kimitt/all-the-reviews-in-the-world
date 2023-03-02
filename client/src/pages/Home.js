import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Blog from "./blog/Blog";
import { SearchIcon } from "@heroicons/react/solid";

function Home() {
  // SEARCH
  const [effectSearch, setEffectSearch] = useState(false);
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => (window.location.href = "/search/" + term), 0.2);
    setTerm("");
  };
  return (
    <div>
      <div className="py-7">
        <h2 className="flex justify-center font-title text-[3rem]">
          세상의 모든 리뷰
        </h2>
        <p className="flex justify-center ">세상의 모든 리뷰를 만나보세요!</p>
      </div>

      <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
        <div className="flex justify-center items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
          <form onSubmit={(e) => onSubmit(e)} className="w-[50%]">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <button
                type="submit"
                className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
              >
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
              <input
                id="search"
                name="search"
                required
                onChange={(e) => {
                  handleChange(e);
                }}
                className="block w-full bg-white border border-gray-300 rounded-md mx-auto py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center">
        <Link to="blog/create" className="bg-black text-white px-6 py-2">
          리뷰작성
        </Link>
      </div>
      <Blog />
    </div>
  );
}

//redux state에서 component에 props로 전달
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Home);
