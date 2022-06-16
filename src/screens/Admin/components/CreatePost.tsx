import { useEffect, useState, createRef, useContext, useCallback } from "react"
import { db } from "../../../creds/firebase";
import EditableContent from "./EditableContent"
import { genAutoId } from "../helpers";
import { ContentProps } from "../types";
import PostsContext from "../../../context/posts/PostsContext";
import { useNavigate, useParams } from "react-router-dom";

const dateToStr = (d: Date) => {
    return d.getMonth() + '/' + d.getDay() + '/' + d.getFullYear()
}


const CreatePost = () => {
    const [postId, setPostId] = useState('');
    const [content, setContent] = useState<ContentProps[]>([]);
    const [date, setDate] = useState<string>(dateToStr(new Date()));
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [refs, setRefs] = useState<any>({});
    const [saving, setSaving] = useState(false);
    const [, setDisablePaste] = useState(false);
    const { posts, fetched } = useContext(PostsContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const pasteHandler = useCallback((e: ClipboardEvent) => {
        setDisablePaste(val => {
            if (!val) {
                if (e.clipboardData) onPaste(e.clipboardData.getData('text/html'))
            }
            return val
        })
    }, [])

    const keyDownHandler = useCallback((e: KeyboardEvent) => {
        setDisablePaste(val => {
            if (!val) {
                e = e || window.event;
                if (e.key === "Enter") setContent(c => ([...c, { type: "p", content: "", id: genAutoId() }]))
            }
            return val
        })
        if (e.ctrlKey && e.key === 's') {
            onSave()
        }
    }, [])

    useEffect(() => {
        document.onkeydown = keyDownHandler;
        document.onpaste = pasteHandler;
        setContent([{ type: 'p', content: "", id: genAutoId() }])
    }, [pasteHandler, keyDownHandler])

    useEffect(() => {
        if (id && fetched) {
            const post = posts.find(p => p.id === id);
            if (!post) {
                navigate("/admin/create-post")
            } else {
                setContent(post.content)
                setTitle(post.title)
                setSubTitle(post.subTitle);
                setDate(post.date);
                setDescription(post.description);
                setThumbnail(post.thumbnail);
                setPostId(post.id)
            }
        } else {
            setContent([{ type: 'p', content: "", id: genAutoId() }])
            setTitle('')
            setSubTitle('');
            setDate(dateToStr(new Date()));
            setDescription('');
            setThumbnail('');
            setPostId('')
        }
    }, [posts, id, fetched, navigate])

    useEffect(() => {
        setRefs(() => {
            const store: any = {}
            content.forEach((item) => {
                store[item.id] = createRef();
            })
            return store
        })
    }, [content])

    const onSave = async () => {
        if (saving) return;
        setSaving(true)
        const data = {
            content,
            title,
            subTitle,
            date,
            description,
            thumbnail
        }
        try {
            await db.collection("Posts").doc(postId ? postId : undefined).set(data)
            alert("successfully saved")
        } catch (err) {
            console.log(err)
            alert("Failed to save")
        }
        setSaving(false)
    }

    const onDelete = async () => {
        if (!postId) return;
        await db.collection("Posts").doc(postId).delete()
            .then(() => {
                window.location.replace('/blog')
            })
            .catch(err => {
                console.log(err)
                alert("Error occurred")
            })
    }

    const onPaste = (html: string) => {
        const HTML = new DOMParser().parseFromString(html, "text/html")
        const body = HTML.getElementsByTagName("body")[0]
        const store: ContentProps[] = [];
        for (let i = 0; i < body.children.length; i++) {
            const node = body.children[i];
            if (node.tagName === 'IMG') {
                const url = node.getAttribute('src')
                if (!url) continue;
                store.push({
                    type: 'img',
                    content: url,
                    id: genAutoId()
                })
            } else {
                if (node.children) {
                    for (let j = 0; j < node.children.length; j++) {
                        while (node.children[j].attributes.length > 0)
                            node.children[j].removeAttribute(node.children[j].attributes[0].name);
                    }
                }

                store.push({
                    type: node.tagName.toLowerCase(),
                    content: node.innerHTML,
                    id: genAutoId()
                })
            }
        }

        setContent(c => [...c, ...store])
    }

    const deleteHandler = (id: string) => () => {
        const index = content.findIndex((c) => c.id === id);
        if (index < 0) return;
        content.splice(index, 1)
        setContent([...content])
    }

    const updateContent = (content: any, type: string, index: number) => {
        if (type === 'gist') {
            setContent(c => {
                c[index].gist = {
                    id: content.id,
                    file: content.file
                }
                c[index].type = type
                return [...c]
            })
        } else {
            setContent(c => {
                c[index].content = content
                c[index].type = type
                return [...c]
            })
        }
    }

    const onFocusHandler = (bol: boolean) => () => setDisablePaste(bol)

    return (
        <div className="admin">
            <button onClick={onDelete}>Delete</button>
            <h1>Create Post</h1>
            <h2>Header</h2>
            <div className="admin-header-form">
                <div className="input-control">
                    <label htmlFor='id'>ID</label>
                    <input id='id' type='text' placeholder="None" value={id} disabled />
                </div>
                <div className="input-control">
                    <label htmlFor='title'>Title</label>
                    <input id='title' type='text' placeholder="Title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} onFocus={(onFocusHandler(true))} onBlur={(onFocusHandler(false))} />
                </div>
                <div className="input-control">
                    <label htmlFor='subTitle'>Sub Title</label>
                    <input id='subTitle' type='text' placeholder="Sub Title" defaultValue={subTitle} onChange={(e) => setSubTitle(e.target.value)} onFocus={(onFocusHandler(true))} onBlur={(onFocusHandler(false))} />
                </div>
                <div className="input-control">
                    <label htmlFor='date'>Publish Date</label>
                    <input id='date' type='text' placeholder="Published Date" value={date} onChange={(e) => setDate(e.target.value)} onFocus={(onFocusHandler(true))} onBlur={(onFocusHandler(false))} />
                </div>
                <div className="input-control">
                    <label htmlFor='desc'>Description</label>
                    <input id='desc' type='text' placeholder="Seen on the preview screen" defaultValue={description} onChange={(e) => setDescription(e.target.value)} onFocus={(onFocusHandler(true))} onBlur={(onFocusHandler(false))} />
                </div>
                <div className="input-control">
                    <label htmlFor='thumb'>Thumbnail</label>
                    <input id='thumb' type='text' placeholder="https" defaultValue={thumbnail} onChange={(e) => setThumbnail(e.target.value)} onFocus={(onFocusHandler(true))} onBlur={(onFocusHandler(false))} />
                </div>
            </div>
            <h2>Content</h2>
            {content.map((item, i) => {
                return <EditableContent
                    {...item}
                    key={item.id}
                    onPaste={onPaste}
                    onDelete={deleteHandler(item.id)}
                    ref={refs[item.id]}
                    setDisablePaste={setDisablePaste}
                    onContentChange={(content, type) => updateContent(content, type, i)}
                />
            })}
            <button onClick={onSave}>{saving ? "Saving..." : "Save"}</button>
        </div>
    )
}

export default CreatePost