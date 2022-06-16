import { FC, useLayoutEffect, useRef } from "react";

type Props = {
    id: string
    file?: string
}

const Gist: FC<Props> = ({ id, file }) => {
    const iframeRef: any = useRef();

    useLayoutEffect(() => {
        const iframe = iframeRef.current
        let doc = iframe.document;
        if (iframe.contentDocument) doc = iframe.contentDocument;
        else if (iframe.contentWindow) doc = iframe.contentWindow.document;
        const fileArg = file ? `?file=${file}` : "";
        const link = `https://gist.github.com/${id}.js${fileArg}`;

        const gistScript = `<script type="text/javascript" src="${link}"></script>`;
        const styles = "<style>*{font-size:12px;}</style>";
        const elementId = file ? `gist-${id}-${file}` : `gist-${id}`;
        const resizeScript = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`;
        const iframeHtml = `<html><head><base target="_parent">${styles}</head><body ${resizeScript}>${gistScript}</body></html>`;
        doc.open();
        doc.writeln(iframeHtml);
        doc.close();
    }, [id, file])

    return (
        <iframe
            ref={iframeRef}
            width='100%'
            frameBorder={0}
            id={file ? `gist-${id}-${file}` : `gist-${id}`}
            title="iframe gist"
        />
    )
}

export default Gist;