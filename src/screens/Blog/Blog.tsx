import { useContext } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import PostsContext from "../../context/posts/PostsContext";
import BlogItem from "./BlogItem";


const Blog = () => {
    const { posts } = useContext(PostsContext);
    return (
        <PageWrapper label="Blog">
            <div className="blog">
                {posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((blog) => <BlogItem {...blog} key={blog.id} />)}
            </div>
        </PageWrapper>
    )
}

export default Blog;