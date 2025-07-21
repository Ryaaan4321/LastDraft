"use client"

import {
  useEditor,
  EditorContent,
  BubbleMenu,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Heading from "@tiptap/extension-heading"
import { useEffect } from "react"
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Undo, Redo, Type } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TiptapEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function TiptapEditor({ value, onChange, placeholder }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Heading.configure({ levels: [1, 2, 3] })],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] p-4 border rounded-md focus:outline-none bg-white text-black dark:bg-gray-900 dark:text-gray-100 prose prose-sm max-w-none",
        placeholder: placeholder || "Start typing...",
      },
    }
  })

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value, false) // false avoids triggering onUpdate again
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex gap-2 flex-wrap border rounded-md p-2 bg-muted">
        <Button
          variant={editor.isActive("bold") ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("italic") ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("underline") ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Type className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
