"use client";

import {Bold, Eye, Heading2, Italic, Link2, List, ListOrdered, Pencil, Undo2} from "lucide-react";
import {useRef, useState} from "react";
import KnowledgeContent from "../../knowledge/KnowledgeContent";

type Props = {
  value: string;
  onChange: (value: string) => void;
  locale: "km" | "en";
  placeholder: string;
};

export default function RichTextEditor({value, onChange, locale, placeholder}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);

  function replaceSelection(before: string, after = before, fallback = "text") {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end) || fallback;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function formatLines(prefix: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end) || (locale === "km" ? "សរសេរនៅទីនេះ" : "Write here");
    const formatted = selected.split("\n").map((line, index) => prefix === "1. " ? `${index + 1}. ${line}` : `${prefix}${line}`).join("\n");
    onChange(value.slice(0, start) + formatted + value.slice(end));
    requestAnimationFrame(() => textarea.focus());
  }

  function addLink() {
    const url = window.prompt(locale === "km" ? "បញ្ចូល Link (https://...)" : "Enter link (https://...)");
    if (!url?.startsWith("http")) return;
    replaceSelection("[", `](${url})`, locale === "km" ? "ឈ្មោះ Link" : "Link text");
  }

  const buttonClass = "inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-black text-slate-600 transition hover:bg-white hover:text-green-700 hover:shadow-sm";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <button type="button" title={locale === "km" ? "អក្សរដិត" : "Bold"} onClick={() => replaceSelection("**")} className={buttonClass}><Bold className="h-4 w-4" /></button>
        <button type="button" title={locale === "km" ? "អក្សរទ្រេត" : "Italic"} onClick={() => replaceSelection("*")} className={buttonClass}><Italic className="h-4 w-4" /></button>
        <button type="button" title={locale === "km" ? "ចំណងជើងរង" : "Subheading"} onClick={() => formatLines("## ")} className={buttonClass}><Heading2 className="h-4 w-4" /></button>
        <button type="button" title={locale === "km" ? "បញ្ជីចំណុច" : "Bullet list"} onClick={() => formatLines("- ")} className={buttonClass}><List className="h-4 w-4" /></button>
        <button type="button" title={locale === "km" ? "បញ្ជីលេខ" : "Numbered list"} onClick={() => formatLines("1. ")} className={buttonClass}><ListOrdered className="h-4 w-4" /></button>
        <button type="button" title={locale === "km" ? "ដាក់ Link" : "Add link"} onClick={addLink} className={buttonClass}><Link2 className="h-4 w-4" /></button>
        <span className="mx-1 h-6 w-px bg-slate-200" />
        <button type="button" title={locale === "km" ? "ត្រឡប់ការកែ" : "Undo"} onClick={() => {textareaRef.current?.focus(); document.execCommand("undo");}} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-green-700"><Undo2 className="h-4 w-4" /></button>
        <button type="button" onClick={() => setPreview((current) => !current)} className={`ml-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-black transition ${preview ? "bg-green-600 text-white" : "bg-white text-slate-600 shadow-sm hover:text-green-700"}`}>
          {preview ? <Pencil className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {preview ? (locale === "km" ? "កែអត្ថបទ" : "Edit") : (locale === "km" ? "មើលជាមុន" : "Preview")}
        </button>
      </div>
      {preview ? (
        <div className="min-h-72 bg-white p-5"><KnowledgeContent content={value} /></div>
      ) : (
        <textarea ref={textareaRef} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-72 w-full resize-y bg-white p-5 text-base leading-8 outline-none" placeholder={placeholder} />
      )}
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] font-bold text-slate-400">
        {locale === "km" ? "Select អក្សរ រួចចុចប៊ូតុងខាងលើ • ចុច មើលជាមុន ដើម្បីពិនិត្យ" : "Select text, then choose a format • Use Preview to check the result"}
      </div>
    </div>
  );
}
