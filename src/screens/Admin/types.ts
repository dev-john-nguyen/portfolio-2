export type ContentProps = {
    type: string
    content: string
    gist?: {
        id: string
        file?: string
    }
    id: string
}