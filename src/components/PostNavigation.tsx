import { Link } from "react-router-dom";
import type { Post } from "../data/posts";
import posts from "../data/posts";

interface PostNavigationProps {
  currentSlug: string;
}

export default function PostNavigation({ currentSlug }: PostNavigationProps) {
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) return null;

  const prevPost: Post | null =
    currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost: Post | null =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <nav className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-[#e5e5e5] dark:border-[#333333]">
      {/* 上一篇 */}
      <div className="flex-1">
        {prevPost ? (
          <Link
            to={`/posts/${prevPost.slug}`}
            className="group block"
          >
            <span className="text-xs text-[#666666] dark:text-[#999999] uppercase tracking-wide">
              ← 上一篇
            </span>
            <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#e5e5e5] mt-1 group-hover:text-[#2563eb] transition-colors">
              {prevPost.title}
            </p>
          </Link>
        ) : (
          <span className="text-xs text-[#666666] dark:text-[#999999]">已是第一篇</span>
        )}
      </div>

      {/* 下一篇 */}
      <div className="flex-1 text-right">
        {nextPost ? (
          <Link
            to={`/posts/${nextPost.slug}`}
            className="group block"
          >
            <span className="text-xs text-[#666666] dark:text-[#999999] uppercase tracking-wide">
              下一篇 →
            </span>
            <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#e5e5e5] mt-1 group-hover:text-[#2563eb] transition-colors">
              {nextPost.title}
            </p>
          </Link>
        ) : (
          <span className="text-xs text-[#666666] dark:text-[#999999]">已是最后一篇</span>
        )}
      </div>
    </nav>
  );
}
