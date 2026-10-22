"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert max-w-none text-xs leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-base font-bold text-white mt-3 mb-1.5 border-b border-white/[0.08] pb-1" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-sm font-bold text-cyan-200 mt-2.5 mb-1" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-xs font-bold text-white mt-2 mb-1 uppercase tracking-wide text-cyan-300" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-xs font-semibold text-slate-200 mt-1.5 mb-0.5" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="my-1.5 text-slate-300 leading-relaxed" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="my-1.5 pl-4 list-disc space-y-0.5 text-slate-300 marker:text-cyan-400" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="my-1.5 pl-4 list-decimal space-y-0.5 text-slate-300 marker:text-cyan-400" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),
          strong: ({ ...props }) => (
            <strong className="font-semibold text-white" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="text-slate-200 italic" {...props} />
          ),
          hr: ({ ...props }) => (
            <hr className="my-3 border-white/[0.08]" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="my-2 border-l-2 border-cyan-400/60 bg-cyan-950/20 pl-3 py-1 text-slate-300 rounded-r" {...props} />
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="rounded bg-[#061022] px-1.5 py-0.5 font-mono text-[11px] text-cyan-300 border border-cyan-500/25" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="my-2 overflow-x-auto rounded-xl bg-[#050b18] p-3 text-[11px] font-mono text-slate-200 border border-white/[0.08]">
                <code {...props}>{children}</code>
              </pre>
            );
          },
          // TABLAS: Maquetación completa para Markdown GFM
          table: ({ ...props }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#091124]">
              <table className="w-full text-left text-[11px] border-collapse" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-[#0e1a35] text-white border-b border-white/[0.08] font-bold" {...props} />
          ),
          tbody: ({ ...props }) => (
            <tbody className="divide-y divide-white/[0.04]" {...props} />
          ),
          tr: ({ ...props }) => (
            <tr className="hover:bg-white/[0.02] transition-colors" {...props} />
          ),
          th: ({ ...props }) => (
            <th className="px-3 py-2 font-semibold text-cyan-200 uppercase tracking-wider text-[10px]" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="px-3 py-2 text-slate-300 align-top" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
