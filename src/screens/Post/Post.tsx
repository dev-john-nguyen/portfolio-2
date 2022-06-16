import React from "react";
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { Gist } from "../../components/Gist";
import { PageWrapper } from "../../components/PageWrapper"
import AuthContext from "../../context/auth/AuthContext";
import PostsContext, { PostProps } from "../../context/posts/PostsContext"
import Recommended from "./Recommended";

const Post = () => {
    const [post, setPost] = useState<PostProps>();
    const [loading, setLoading] = useState(false);
    const { posts, fetched } = useContext(PostsContext);
    const { isAuth } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        setPost(posts.find(p => p.id === id))
        setLoading(false)
    }, [posts, id])

    const onNavigateToEdit = () => navigate(`/admin/edit-post/${id}`);

    return (
        <PageWrapper label={post ? post.title : "Not Found"} subLabel={post ? post.subTitle : ""} loading={!fetched || loading}>
            <div className="post">
                {isAuth && post && <button onClick={onNavigateToEdit}>Edit Post</button>}
                {
                    post && post.content.map((p) => {
                        if (p.gist) {
                            return <Gist id={p.gist.id} file={p.gist.file} key={p.id} />
                        }
                        const elementProps = {
                            dangerouslySetInnerHTML: { __html: p.content },
                            key: p.id
                        }
                        return React.createElement(p.type, elementProps)
                    })
                }
            </div>
            <Recommended posts={posts} activeId={id} />
        </PageWrapper>
    )
}

export default Post