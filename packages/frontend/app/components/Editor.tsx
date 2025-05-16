import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";

type Props = {
  markdown: string;
  onChange: (markdown: string) => void;
  className?: string;
};

export const MarkdownEditor = ({ markdown, onChange, className }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: markdown,
  });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const updatedMarkdown = editor.storage.markdown.getMarkdown();
      onChange(updatedMarkdown);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, onChange]);

  return (
    <div>
      <EditorContent editor={editor} className={`h-24 ${className}`}/>
    </div>
  );
};
