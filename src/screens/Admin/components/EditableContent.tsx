import React, { FC, useState, forwardRef, useEffect } from "react";
import { Gist } from "../../../components/Gist";
import { ContentProps } from "../types";
import { ReactComponent as AddFile } from '../../../assets/icons/add-file.svg';
import { ReactComponent as XFile } from '../../../assets/icons/x.svg';
import { ReactComponent as Code } from '../../../assets/icons/code.svg';
import { ReactComponent as Save } from '../../../assets/icons/save.svg';

type Props = {
    onPaste: (html: string) => void
    onDelete: () => void
    ref?: any
    setDisablePaste: React.Dispatch<React.SetStateAction<boolean>>
    onContentChange: (content: any, type: string) => void
}

const EditableContent: FC<ContentProps & Props> = forwardRef(({ type, content, onPaste, onDelete, setDisablePaste, onContentChange, gist }, ref: any) => {
    const [input, setInput] = useState('');
    const [isGist, setIsGist] = useState(false);
    const [file, setFile] = useState('');
    const [id, setId] = useState('');
    const [raw, setRaw] = useState(false);
    const [rawContent, setRawContent] = useState('');


    useEffect(() => {
        if (gist) {
            setId(gist.id)
            setFile(gist.file || '')
        }
    }, [gist])

    useEffect(() => {
        setRawContent(content)
    }, [content])

    const onRemove = () => {
        setId('')
        setFile('')
        onContentChange('', 'p')
        setIsGist(false)
    }

    if (type === 'gist') {
        return (
            <div className={`section ${(!input && !isGist) ? 'section-empty' : ''}`}>
                <div className="section-gist">
                    <button onClick={onRemove}>Remove</button>
                    <Gist id={id} file={file} />
                </div>
            </div>
        )
    }

    if (type === 'img') {
        return (
            <div onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault()
                if (e.key === "Backspace") onDelete()
            }} contentEditable>
                <img src={content} alt='content' />
            </div>
        )
    }

    const onSaveRaw = () => {
        onContentChange(rawContent, type)
        setRaw(false)
    }

    if (raw) {
        return (
            <div className={`section section-empty`}>
                <div className='raw-container'>
                    <textarea value={rawContent} onChange={(e) => setRawContent(e.currentTarget.value)} />
                </div>
                <div className="section-actions">
                    <button onClick={onSaveRaw}><Save /></button>
                    <button onClick={() => setRaw(false)}><Code /></button>
                </div>
            </div>
        )
    }

    const elementProps = {
        onInput: (e: any) => setInput(e.currentTarget.textContent || ''),
        contentEditable: true,
        dangerouslySetInnerHTML: { __html: content },
        onPaste: (e: ClipboardEvent) => {
            e.preventDefault()
            onDelete()
        },
        onKeyDown: (e: any) => {
            if (e.key === 'Enter') e.preventDefault()
            if (e.key === "Backspace" && !e.target.innerHTML) onDelete()
        },
        ref: ref,
        style: { width: '100%', height: '100%', padding: 20, border: '1px solid #eee', borderRadius: 5 }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!id) return alert("id required")
        onContentChange({
            id,
            file
        }, 'gist')
        setDisablePaste(false)
    }

    const onSwitchToGist = () => {
        setIsGist(true)
        setDisablePaste(true)
    }

    return (
        <div className={`section ${(!input && !isGist) ? 'section-empty' : ''}`}>
            {isGist ?
                <div>
                    <form onSubmit={onSubmit}>
                        <input onChange={(e) => setId(e.target.value)} placeholder="Gist Id" />
                        <input onChange={(e) => setFile(e.target.value)} placeholder="File Name" />
                        <input type="submit" />
                    </form>
                </div> : React.createElement(type, elementProps)}
            <div className="section-actions">
                <button onClick={onSwitchToGist}>
                    <AddFile />
                </button>
                <button onClick={onDelete}><XFile /></button>
                <button onClick={() => setRaw(true)}><Code /></button>
            </div>
        </div>
    )
})

export default EditableContent