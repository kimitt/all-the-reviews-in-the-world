import React from "react";

function BlogCreate() {
  return (
    <div>
      <h1 className="flex justify-center p-3 font-title text-[2rem]">
        리뷰 작성
      </h1>
      <div className="flex justify-center items-center p-2 mt-9 text-sm">
        <form className="flex justify-center flex-col w-[300px]">
          <label id="category" className="pb-2">
            카테고리 :
          </label>
          <input
            type="text"
            placeholder="카테고리를 입력해주세요."
            id="category"
            name="category"
            className="border-b-[1px] border-black pb-2 pl-2 mb-2"
          />
          <label id="title" className="pb-2">
            제목 :
          </label>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            id="title"
            name="title"
            className="border-b-[1px] border-black pb-2 pl-2"
          />
          <label id="description" className="pb-2 mt-3">
            내용 :
          </label>
          <textarea
            placeholder="내용을 입력하세요."
            id="description"
            name="description"
            className="border-[1px] border-black h-[300px] pl-2 pt-2"
          />
          <div className="flex justify-center mt-5">
            <button
              className="w-[350px] bg-black text-white rounded-[20px] p-2"
              type="submit"
            >
              리뷰 작성 하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogCreate;
