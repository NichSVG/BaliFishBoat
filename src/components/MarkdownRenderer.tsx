"use client";

import ReactMarkdown from "react-markdown";

const components = {
  h1: ({ node, ...props }: any) => <h1 className="text-3xl font-bold text-slate-900 mt-10 mb-4" {...props} />,
  h2: ({ node, ...props }: any) => <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3" {...props} />,
  p: ({ node, ...props }: any) => <p className="text-slate-700 leading-relaxed mb-4" {...props} />,
  ul: ({ node, ...props }: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700" {...props} />,
  ol: ({ node, ...props }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-slate-700" {...props} />,
  li: ({ node, ...props }: any) => <li className="leading-relaxed" {...props} />,
  a: ({ node, ...props }: any) => <a className="text-blue-600 hover:underline" {...props} />,
  strong: ({ node, ...props }: any) => <strong className="font-semibold text-slate-900" {...props} />,
  blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-blue-200 pl-4 italic text-slate-600 my-4" {...props} />,
  code: ({ node, ...props }: any) => <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm text-slate-800" {...props} />,
  hr: () => <hr className="my-8 border-slate-200" />,
  table: ({ node, ...props }: any) => <table className="w-full border-collapse mb-4" {...props} />,
  th: ({ node, ...props }: any) => <th className="border border-slate-200 px-4 py-2 bg-slate-50 font-semibold text-left" {...props} />,
  td: ({ node, ...props }: any) => <td className="border border-slate-200 px-4 py-2" {...props} />,
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}