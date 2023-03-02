import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/loaders/Loading";
import useAuth from "../../hooks/useAuth";
import { get_blog } from "../../redux/actions/blog";

function BlogPost({ get_blog, post }) {
  const params = useParams();
  const slug = params.slug;
  const { user } = useAuth();

  useEffect(() => {
    get_blog(slug);
  }, []);

  return (
    <>
      {post ? (
        <div className="relative py-16 bg-white overflow-hidden">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">
              <h1>
                <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                  {post.category.name}
                </span>
                <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {post.title}
                </span>
              </h1>
              <p className="flex justify-center mt-5 text-sm text-gray-500 leading-8 font-bold">
                리뷰어 : {user?.username}
              </p>
            </div>

            <div className="flex justify-center mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto px-10">
              <p>{post.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  post: state.blog.post
});

export default connect(mapStateToProps, {
  get_blog
})(BlogPost);
