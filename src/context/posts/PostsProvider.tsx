import { useEffect } from 'react';
import { useState } from 'react';
import PostsContext, { PostProps } from './PostsContext';
import { db } from '../../creds/firebase';


// const item = {
//     id: "1",
//     img: "https://cdn-images-1.medium.com/max/1024/0*uqChJ1KMObsCJZCN",
//     description: "There’s a famous quote from Henry Ford that I reflect on frequently in times of doubt.",
//     title: "I Can Do It! You Can Do It!",
//     path: "/blog/58bd584cdffe",
//     date: "05/21/2022"
// }
// const blogs = [
//     item,
//     item,
//     item,
//     item
// ]

const PostsProvider = ({ children }: { children: any }) => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [fetched, setFetched] = useState(false)


    const fetchPosts = async () => {
        // const response = await fetch("http://127.0.0.1:5000/api/posts")
        // const resJson = await response.json()
        const snapshot = await db.collection("Posts").get()
        const fetchedPosts: PostProps[] = [];
        if (snapshot.docs) {
            snapshot.docs.forEach(doc => {
                if (doc.exists) fetchedPosts.push({ id: doc.id, ...doc.data() } as PostProps)
            })
        }
        setPosts(fetchedPosts)
        setFetched(true)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <PostsContext.Provider value={{ posts, fetched }}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsProvider;