import { useEffect } from "react";
import { connect } from "react-redux";
import { get_blog_list, get_blog_list_page } from "../../redux/actions/blog";

import BlogList from "../../components/blog/BlogList";

function Blog({ get_blog_list, get_blog_list_page, blog_list }) {
  useEffect(() => {
    get_blog_list();
  }, []);

  return (
    <>
      {/* <BlogCategory /> */}
      <BlogList get_blog_list_page={get_blog_list_page} blog_list={blog_list} />
    </>
  );
}

const mapStateToProps = (state) => ({
  blog_list: state.blog.blog_list
});

export default connect(mapStateToProps, {
  get_blog_list,
  get_blog_list_page
})(Blog);
