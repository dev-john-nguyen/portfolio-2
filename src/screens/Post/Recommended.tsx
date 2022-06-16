import { FC } from "react";
import { PostProps } from "../../context/posts/PostsContext";
import BlogItem from "../Blog/BlogItem";

type Props = {
    posts: PostProps[]
    activeId?: string
}

const Recommended: FC<Props> = ({ posts, activeId }) => {
    return (
        <div className="recommended">
            <h1>More Articles</h1>
            <div className="recommended-articles">
                {posts.filter(({ id }) => id !== activeId).map((post, index) => index < 3 && (
                    <BlogItem {...post} key={post.id} />
                ))}
            </div>
        </div>
    )
}

export default Recommended;