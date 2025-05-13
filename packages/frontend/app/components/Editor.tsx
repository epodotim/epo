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

export function Editor() {
  const [EditorComponent, setEditorComponent] = useState<MDXEditorType | null>(null);

  useEffect(() => {
    // クライアントサイドでのみMDXEditorを動的にインポート
    import('@mdxeditor/editor')
      .then(module => {
        setEditorComponent(() => module.MDXEditor);
      })
      .catch(err => {
        console.error("Failed to load MDXEditor", err);
        // エラーハンドリング: 例えばフォールバックUIを表示するなど
      });
  }, []);

  return (
    <ClientOnly>
      <Suspense fallback={<div>Loading editor...</div>}>
        {EditorComponent ? (
          <EditorComponent markdown="hello epo" className="text-white"/>
        ) : (
          <div>Loading editor component...</div> // MDXEditorコンポーネント自体のロード中
        )}
      </Suspense>
    </ClientOnly>
  )
}
