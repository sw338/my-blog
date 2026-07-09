import { Link } from "react-router-dom";
import type { Post } from "../data/posts";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/posts/${post.slug}`}>
    <article className="border border-[#e5e5e5] dark:border-[#333333] rounded-lg p-6 bg-white dark:bg-[#242424] hover:shadow-md transition-shadow duration-200 cursor-pointer">
      {/* 分类标签 */}
      <span className="inline-block text-xs font-medium text-[#2563eb] bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full mb-3">
        {post.category}
      </span>

      {/* 标题 */}
      <h3 className="text-xl font-semibold text-[#1a1a1a] dark:text-[#e5e5e5] mb-2 hover:text-[#2563eb] transition-colors">
        {post.title}
      </h3>

      {/* 摘要 — 2行截断 */}
      <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-4 line-clamp-2">
        {post.summary}
      </p>

      {/* 底部：日期 + 标签 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <time className="text-xs text-[#666666] dark:text-[#999999]">{post.date}</time>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#666666] dark:text-[#999999] bg-gray-100 dark:bg-[#333333] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
    </Link>
  );
}
