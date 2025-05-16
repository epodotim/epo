import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";

// 必要な拡張（StarterKit には含まれていないもの）
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

type Props = {
  markdown: string;
  onChange: (markdown: string) => void;
  className?: string;
};

export const MarkdownEditor = ({ markdown, onChange, className }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Markdown],
    content: markdown,
  });

  // Markdown変更を親に通知
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const md = editor.storage.markdown.getMarkdown();
      onChange(md);
    };

    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, onChange]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 text-gray-800">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btnClass(editor.isActive("underline"))}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive("strike"))}
        >
          S
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={btnClass(editor.isActive("heading", { level: 1 }))}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={btnClass(editor.isActive("heading", { level: 2 }))}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={btnClass(editor.isActive("heading", { level: 3 }))}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}
        >
          Ordered List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={btnClass(editor.isActive("codeBlock"))}
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
        >
          ❝
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Please enter a URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={btnClass(editor.isActive("link"))}
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={btnClass(false)}
        >
          ❌🔗
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className={`border p-2 rounded h-full min-h-60 focus:outline-none focus:ring-0 ${className}`}
      />
    </div>
  );
};

function btnClass(active: boolean) {
  return `px-2 py-1 border rounded text-sm ${
    active ? "bg-blue-200 text-blue-800" : "bg-gray-100 hover:bg-gray-200"
  }`;
}
