import { marked } from "marked"

type Props = {
  markdown: string
}

export const MarkdownPreview = ({ markdown }: Props) => {
  const html = marked.parse(markdown)

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}