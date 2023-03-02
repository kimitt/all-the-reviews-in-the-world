import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function BlogDetail(data) {
  let post = data && data.data;
  const params = useParams();
  const slug = params.slug;

  useEffect(({ get_blog, post }) => {
    get_blog(slug);
  }, []);
  return (
    <div>
      <div>
        <div>{post.image}</div>

        <div>{post.title}</div>
        <div>{post.description}</div>
      </div>
    </div>
  );
}

export default BlogDetail;
