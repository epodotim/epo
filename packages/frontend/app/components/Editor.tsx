import '@mdxeditor/editor/style.css'
import { useEffect, useState, Suspense, type ComponentType } from 'react'

type MDXEditorType = ComponentType<{
  markdown: string
  onChange?: (markdown: string) => void
  plugins?: any[]
  className?: string
}>

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  return isClient ? <>{children}</> : null
}

type EditorProps = {
  markdown: string
  onChange: (value: string) => void
  className?: string
}

export function Editor({ markdown, onChange, className }: EditorProps) {
  const [EditorComponent, setEditorComponent] = useState<MDXEditorType | null>(null)
  const [plugins, setPlugins] = useState<any[] | null>(null)

  useEffect(() => {
    const loadEditor = async () => {
      try {
        const {
          MDXEditor,
          toolbarPlugin,
          headingsPlugin,
          listsPlugin,
          quotePlugin,
          linkPlugin,
          markdownShortcutPlugin,
          codeBlockPlugin,
          tablePlugin,
          BoldItalicUnderlineToggles,
          CreateLink,
          InsertTable,
          ListsToggle,
          Separator,
          UndoRedo,
        } = await import('@mdxeditor/editor')

        setEditorComponent(() => MDXEditor)
        setPlugins([
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <Separator />
                <CreateLink />
                <InsertTable />
              </>
            ),
          }),
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          linkPlugin(),
          markdownShortcutPlugin(),
          codeBlockPlugin(),
          tablePlugin(),
        ])
      } catch (err) {
        console.error('Failed to load MDXEditor', err)
      }
    }

    loadEditor()
  }, [])

  return (
    <ClientOnly>
      <Suspense fallback={<div>Loading editor...</div>}>
        {EditorComponent && plugins ? (
          <EditorComponent
            markdown={markdown}
            onChange={onChange}
            plugins={plugins}
            className={`dark-theme dark-editor ${className ?? 'text-white'}`}
          />
        ) : (
          <div>Loading editor component...</div>
        )}
      </Suspense>
    </ClientOnly>
  )
}
