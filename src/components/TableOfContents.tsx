import { useState, useEffect, useCallback } from "react";
import GithubSlugger from "github-slugger";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [collapsed, setCollapsed] = useState(true);

  // 从 Markdown 内容中提取 h2/h3 标题
  useEffect(() => {
    const slugger = new GithubSlugger();
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = slugger.slug(text);

      items.push({ id, text, level });
    }

    setToc(items);
  }, [content]);

  // 监听滚动，高亮当前章节
  const handleScroll = useCallback(() => {
    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    // 找到第一个在视口上方或接近顶部的标题
    for (let i = headings.length - 1; i >= 0; i--) {
      const rect = headings[i].getBoundingClientRect();
      if (rect.top <= 120) {
        setActiveId(toc[i].id);
        return;
      }
    }

    setActiveId(toc[0]?.id || "");
  }, [toc]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (toc.length === 0) return null;

  return (
    <nav className="toc-container">
      {/* 移动端可收起标题栏 */}
      <button
        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-[#1a1a1a] md:cursor-default"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span>目录</span>
        <svg
          className={`h-4 w-4 transition-transform md:hidden ${
            collapsed ? "" : "rotate-180"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <ul
        className={`space-y-1 ${
          collapsed ? "hidden md:block" : "block"
        }`}
      >
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? "16px" : "0" }}
          >
            <a
              href={`#${item.id}`}
              className={`block text-sm py-1 transition-colors border-l-2 pl-3 ${
                activeId === item.id
                  ? "text-[#2563eb] border-[#2563eb] font-medium"
                  : "text-[#666666] border-transparent hover:text-[#1a1a1a] hover:border-[#e5e5e5]"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
