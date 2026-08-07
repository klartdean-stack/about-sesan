import type {ReactNode} from "react";

function inline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g;
  return text.split(pattern).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (link) {
      return <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" className="font-bold text-green-700 underline decoration-green-300 underline-offset-4 hover:text-green-600">{link[1]}</a>;
    }
    return part;
  });
}

export default function KnowledgeContent({content}: {content: string}) {
  const lines = content.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={index} className="mt-8 text-xl font-black text-slate-900">{inline(line.slice(4))}</h3>);
      index += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(<h2 key={index} className="mt-10 text-2xl font-black text-slate-950 sm:text-3xl">{inline(line.slice(3))}</h2>);
      index += 1;
      continue;
    }
    if (/^[-•]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-•]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-•]\s+/, ""));
        index += 1;
      }
      blocks.push(<ul key={`ul-${index}`} className="my-6 list-disc space-y-3 pl-7 marker:text-green-600">{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>);
      continue;
    }
    if (/^[0-9០-៩]+[.)។]\s*/.test(line)) {
      if (!lines[index + 1]?.trim()) {
        blocks.push(<h2 key={index} className="mt-10 text-2xl font-black text-slate-950">{inline(line)}</h2>);
        index += 1;
        continue;
      }
      const items: string[] = [];
      while (index < lines.length && /^[0-9០-៩]+[.)។]\s*/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[0-9០-៩]+[.)។]\s*/, ""));
        index += 1;
      }
      blocks.push(<ol key={`ol-${index}`} className="my-6 list-decimal space-y-3 pl-7 marker:font-black marker:text-green-700">{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ol>);
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{2,3}\s|[-•]\s+|[0-9០-៩]+[.)។]\s*)/.test(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(<p key={`p-${index}`} className="my-5">{inline(paragraph.join(" "))}</p>);
  }

  return <div className="text-lg leading-9 text-slate-700">{blocks}</div>;
}
