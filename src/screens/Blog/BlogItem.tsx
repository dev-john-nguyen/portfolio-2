import { FC } from "react";
import { Link } from 'react-router-dom';
import { PostProps } from "../../context/posts/PostsContext";


const BlogItem: FC<PostProps> = ({ title, description, thumbnail, date, id }) => {
    return (
        <div className="blog-item">
            <Link to={`/post/${id}`}>
                <div className="blog-item-img">
                    <img src={thumbnail} width='100%' height='auto' alt={title} />
                </div>
                <div className="blog-item-content">
                    <h2>{title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <strong>{date}</strong>
            </Link>
        </div>
    )
}

export default BlogItem;