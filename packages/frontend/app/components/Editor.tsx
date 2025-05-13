import '@mdxeditor/editor/style.css'
import { useEffect, useState, Suspense, type ComponentType } from "react";

// MDXEditorの型を適切に定義 (もしあればライブラリの型定義を利用)
// ここでは汎用的なComponentTypeを使用
type MDXEditorType = ComponentType<{ markdown: string; [key: string]: unknown }>;

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // サーバーサイドでは何もレンダリングしない

  return <>{children}</>;
}

type EditorProps = {
  markdown: string;
  onChange: (value: string) => void;
  className?: string;
};

export function Editor({ markdown, onChange, className }: EditorProps) {
  const [EditorComponent, setEditorComponent] = useState<MDXEditorType | null>(null);

  useEffect(() => {
    import('@mdxeditor/editor')
      .then(module => {
        setEditorComponent(() => module.MDXEditor);
      })
      .catch(err => {
        console.error("Failed to load MDXEditor", err);
      });
  }, []);

  // MDXEditorのonChangeイベント名は仮にonChangeとする（実際のAPIに合わせて修正要）
  return (
    <ClientOnly>
      <Suspense fallback={<div>Loading editor...</div>}>
        {EditorComponent ? (
          <EditorComponent
            markdown={markdown}
            onChange={onChange}
            className={`dark-theme dark-editor ${className ?? "text-white"}`}
          />
        ) : (
          <div>Loading editor component...</div>
        )}
      </Suspense>
    </ClientOnly>
  );
}
