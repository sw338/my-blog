import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import posts from "../data/posts";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 过滤结果
  const results =
    query.trim().length > 0
      ? posts.filter((post) => {
          const q = query.toLowerCase();
          return (
            post.title.toLowerCase().includes(q) ||
            post.summary.toLowerCase().includes(q) ||
            post.tags.some((tag) => tag.toLowerCase().includes(q))
          );
        })
      : [];

  // 打开时 autofocus + 重置
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // 重置选中项当结果变化时
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "Escape":
        onClose();
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          onClose();
          // 导航由 Link 点击处理
          document
            .querySelector<HTMLAnchorElement>(
              `a[data-search-index="${selectedIndex}"]`
            )
            ?.click();
        }
        break;
    }
  }

  return (
    <>
      {/* 遮罩 */}
      <div
        className="fixed inset-0 bg-black/50 z-[100]"
        onClick={onClose}
      />

      {/* 弹窗 */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white dark:bg-[#242424] rounded-xl shadow-2xl z-[101] max-h-[70vh] flex flex-col">
        {/* 搜索输入框 */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e5e5e5] dark:border-[#333333]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#666666] dark:text-[#999999] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索文章..."
            className="flex-1 outline-none text-sm text-[#1a1a1a] dark:text-[#e5e5e5] bg-transparent placeholder:text-[#666666] dark:placeholder:text-[#999999]"
          />
          <kbd className="hidden sm:inline-block text-xs text-[#666666] dark:text-[#999999] bg-gray-100 dark:bg-[#333333] px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* 结果列表 */}
        <div className="overflow-y-auto flex-1">
          {query.trim().length === 0 && (
            <p className="text-sm text-[#666666] dark:text-[#999999] text-center py-10">
              输入关键词搜索文章标题、摘要或标签
            </p>
          )}

          {query.trim().length > 0 && results.length === 0 && (
            <p className="text-sm text-[#666666] dark:text-[#999999] text-center py-10">
              未找到相关文章
            </p>
          )}

          {results.length > 0 && (
            <ul className="py-2">
              {results.map((post, index) => (
                <li key={post.id}>
                  <Link
                    to={`/posts/${post.slug}`}
                    data-search-index={index}
                    onClick={onClose}
                    className={`block px-4 py-3 transition-colors ${
                      index === selectedIndex
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "hover:bg-gray-50 dark:hover:bg-[#333333]"
                    }`}
                  >
                    <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#e5e5e5] line-clamp-1">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#2563eb]">
                        {post.category}
                      </span>
                      <span className="text-xs text-[#666666] dark:text-[#999999]">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
