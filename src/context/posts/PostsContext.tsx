import { createContext } from 'react';
import { ContentProps } from '../../screens/Admin/types';


export type PostProps = {
    title: string
    subTitle: string
    description: string
    id: string
    date: string
    thumbnail: string
    content: ContentProps[]
}

export default createContext<{ posts: PostProps[], fetched: boolean }>({ posts: [], fetched: false })