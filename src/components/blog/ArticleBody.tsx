import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import type { BlogBlock } from "@/content/blog-types";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** `текст [ссылка](/path) текст` → текст с <Link>; внешние ссылки — <a>. */
export function inline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      href.startsWith("/") ? (
        <Link href={href}>{label}</Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer">
          {label}
        </a>
      ),
    );
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}

export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "p":
            return <p key={i}>{inline(block.text)}</p>;
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List key={i}>
                {block.items.map((item) => (
                  <li key={item}>{inline(item)}</li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <div key={i} className="prose-table">
                <table>
                  {block.caption && <caption>{block.caption}</caption>}
                  <thead>
                    <tr>
                      {block.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={c} scope="row">
                              {inline(cell)}
                            </th>
                          ) : (
                            <td key={c}>{inline(cell)}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note":
            return (
              <aside key={i} className="prose-note">
                {block.title && <p className="prose-note-title">{block.title}</p>}
                <p>{inline(block.text)}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
