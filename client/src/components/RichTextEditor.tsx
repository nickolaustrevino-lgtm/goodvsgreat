import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEffect, useCallback, useState, useRef } from "react";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link2,
  Link2Off,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  X,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RichTextEditorProps {
  value: string;           // HTML string
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

// ─── Toolbar button ───────────────────────────────────────────────────────────

function ToolBtn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // keep editor focus
        if (!disabled) onClick();
      }}
      title={title}
      disabled={disabled}
      className={[
        "flex items-center justify-center w-8 h-8 rounded transition-colors text-sm",
        active
          ? "bg-[#2979FF] text-white"
          : "text-[#8B9CB6] hover:bg-[#1A2332] hover:text-white",
        disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-[#2A3547] mx-0.5 flex-shrink-0" />;
}

// ─── Link dialog ──────────────────────────────────────────────────────────────

function LinkDialog({
  initial,
  onConfirm,
  onClose,
}: {
  initial: string;
  onConfirm: (url: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState(initial);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0D1117] border border-[#2A3547] rounded-xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-semibold">Insert Link</span>
          <button type="button" onClick={onClose} className="text-[#8B9CB6] hover:text-white">
            <X size={16} />
          </button>
        </div>
        <input
          autoFocus
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full bg-[#1A2332] border border-[#2A3547] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#2979FF] mb-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); onConfirm(url); }
            if (e.key === "Escape") onClose();
          }}
        />
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#8B9CB6] hover:text-white">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(url)}
            className="px-4 py-2 text-sm bg-[#2979FF] text-white rounded-lg hover:bg-[#1565C0]"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Image picker modal ───────────────────────────────────────────────────────

export function ImagePickerModal({
  onSelect,
  onClose,
}: {
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const { data: listData, isLoading } = trpc.files.list.useQuery();
  const files = listData ?? [];
  const [tab, setTab] = useState<"files" | "url">("files");
  const [urlInput, setUrlInput] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#0D1117] border border-[#2A3547] rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A3547]">
          <span className="text-white font-semibold">Insert Image</span>
          <button type="button" onClick={onClose} className="text-[#8B9CB6] hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#2A3547]">
          {(["files", "url"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={[
                "px-5 py-3 text-sm font-medium transition-colors",
                tab === t
                  ? "text-[#2979FF] border-b-2 border-[#2979FF]"
                  : "text-[#8B9CB6] hover:text-white",
              ].join(" ")}
            >
              {t === "files" ? "From File Manager" : "From URL"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {tab === "files" ? (
            isLoading ? (
              <div className="text-[#8B9CB6] text-sm text-center py-8">Loading files…</div>
            ) : !files.length ? (
              <div className="text-[#8B9CB6] text-sm text-center py-8">
                No files uploaded yet. Go to /files to upload images.
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {files
                  .filter((f: { mimeType: string | null }) => f.mimeType?.startsWith("image/"))
                  .map((f: { id: number; url: string; filename: string; mimeType: string | null }) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => onSelect(f.url)}
                      className="group relative aspect-square rounded-lg overflow-hidden border border-[#2A3547] hover:border-[#2979FF] transition-colors bg-[#1A2332]"
                    >
                      <img
                        src={f.url}
                        alt={f.filename}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Select</span>
                      </div>
                    </button>
                  ))}
              </div>
            )
          ) : (
            <div className="space-y-3">
              <label className="text-[#8B9CB6] text-sm">Image URL</label>
              <input
                autoFocus
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.png"
                className="w-full bg-[#1A2332] border border-[#2A3547] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#2979FF]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && urlInput) { e.preventDefault(); onSelect(urlInput); }
                }}
              />
              <button
                type="button"
                disabled={!urlInput}
                onClick={() => urlInput && onSelect(urlInput)}
                className="px-4 py-2 text-sm bg-[#2979FF] text-white rounded-lg hover:bg-[#1565C0] disabled:opacity-40"
              >
                Insert
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article…",
  minHeight = 480,
}: RichTextEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const initialLinkRef = useRef("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[#2979FF] underline cursor-pointer" },
      }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  // Sync external value changes (e.g., loading a saved post)
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const openLinkDialog = useCallback(() => {
    if (!editor) return;
    initialLinkRef.current = editor.getAttributes("link").href ?? "";
    setShowLinkDialog(true);
  }, [editor]);

  const applyLink = useCallback(
    (url: string) => {
      if (!editor) return;
      setShowLinkDialog(false);
      if (!url) {
        editor.chain().focus().unsetLink().run();
        return;
      }
      const href = url.startsWith("http") ? url : `https://${url}`;
      editor.chain().focus().setLink({ href }).run();
    },
    [editor]
  );

  const insertImage = useCallback(
    (url: string) => {
      if (!editor) return;
      setShowImagePicker(false);
      editor.chain().focus().setImage({ src: url }).run();
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <>
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-[#0D1117] border border-[#2A3547] rounded-t-xl">
        {/* Undo / Redo */}
        <ToolBtn title="Undo (⌘Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo size={15} />
        </ToolBtn>
        <ToolBtn title="Redo (⌘⇧Z)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo size={15} />
        </ToolBtn>

        <Divider />

        {/* Headings */}
        <ToolBtn title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 size={15} />
        </ToolBtn>
        <ToolBtn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={15} />
        </ToolBtn>
        <ToolBtn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 size={15} />
        </ToolBtn>

        <Divider />

        {/* Inline marks */}
        <ToolBtn title="Bold (⌘B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={15} />
        </ToolBtn>
        <ToolBtn title="Italic (⌘I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={15} />
        </ToolBtn>
        <ToolBtn title="Underline (⌘U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={15} />
        </ToolBtn>
        <ToolBtn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough size={15} />
        </ToolBtn>

        <Divider />

        {/* Lists */}
        <ToolBtn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={15} />
        </ToolBtn>
        <ToolBtn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={15} />
        </ToolBtn>
        <ToolBtn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={15} />
        </ToolBtn>
        <ToolBtn title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={15} />
        </ToolBtn>

        <Divider />

        {/* Alignment */}
        <ToolBtn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft size={15} />
        </ToolBtn>
        <ToolBtn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter size={15} />
        </ToolBtn>
        <ToolBtn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight size={15} />
        </ToolBtn>

        <Divider />

        {/* Link */}
        <ToolBtn title="Insert / edit link" active={editor.isActive("link")} onClick={openLinkDialog}>
          <Link2 size={15} />
        </ToolBtn>
        {editor.isActive("link") && (
          <ToolBtn title="Remove link" onClick={() => editor.chain().focus().unsetLink().run()}>
            <Link2Off size={15} />
          </ToolBtn>
        )}

        {/* Image */}
        <ToolBtn title="Insert image" onClick={() => setShowImagePicker(true)}>
          <ImageIcon size={15} />
        </ToolBtn>
      </div>

      {/* Editor canvas */}
      <div
        className="bg-[#0D1117] border border-t-0 border-[#2A3547] rounded-b-xl px-6 py-5 cursor-text"
        style={{ minHeight }}
        onClick={() => editor.commands.focus()}
      >
        <EditorContent
          editor={editor}
          className="prose prose-invert prose-sm max-w-none
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:text-white [&_.ProseMirror_h1]:mt-6 [&_.ProseMirror_h1]:mb-3
            [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:text-white [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h2]:mb-2
            [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:text-white [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:mb-2
            [&_.ProseMirror_p]:text-[#C9D1D9] [&_.ProseMirror_p]:leading-7 [&_.ProseMirror_p]:mb-3
            [&_.ProseMirror_strong]:text-white [&_.ProseMirror_strong]:font-semibold
            [&_.ProseMirror_em]:italic [&_.ProseMirror_em]:text-[#C9D1D9]
            [&_.ProseMirror_a]:text-[#2979FF] [&_.ProseMirror_a]:underline
            [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:text-[#C9D1D9] [&_.ProseMirror_ul]:mb-3
            [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:text-[#C9D1D9] [&_.ProseMirror_ol]:mb-3
            [&_.ProseMirror_li]:mb-1
            [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-[#2979FF] [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:text-[#8B9CB6] [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:my-4
            [&_.ProseMirror_hr]:border-[#2A3547] [&_.ProseMirror_hr]:my-6
            [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:my-4
            [&_.ProseMirror_code]:bg-[#1A2332] [&_.ProseMirror_code]:text-[#79C0FF] [&_.ProseMirror_code]:px-1.5 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-sm
            [&_.ProseMirror_pre]:bg-[#1A2332] [&_.ProseMirror_pre]:rounded-lg [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:my-4 [&_.ProseMirror_pre]:overflow-x-auto
            [&_.ProseMirror_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_.is-editor-empty:first-child::before]:text-[#4A5568] [&_.ProseMirror_.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_.is-editor-empty:first-child::before]:h-0
          "
        />
      </div>

      {/* Dialogs */}
      {showLinkDialog && (
        <LinkDialog
          initial={initialLinkRef.current}
          onConfirm={applyLink}
          onClose={() => setShowLinkDialog(false)}
        />
      )}
      {showImagePicker && (
        <ImagePickerModal
          onSelect={insertImage}
          onClose={() => setShowImagePicker(false)}
        />
      )}
    </>
  );
}
