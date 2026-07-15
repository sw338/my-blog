import { Link } from "react-router-dom";
import type { Post } from "../data/posts";

interface PostCardProps { post: Post; }

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/posts/${post.slug}`}>
    <article className="py-6 border-b border-[#e8e4df] dark:border-[#2a2a2a] hover:opacity-70 transition-opacity">
      <span className="inline-block text-xs text-[#666] dark:text-[#999] bg-[#f0ece6] dark:bg-[#2a2a2a] px-2.5 py-0.5 rounded-sm mb-3">{post.category}</span>
      <h3 className="text-lg font-medium text-[#2c2c2c] dark:text-[#d4d4d4] mb-2 leading-snug">{post.title}</h3>
      <p className="text-sm text-[#666] dark:text-[#999] leading-relaxed mb-3 line-clamp-2">{post.summary}</p>
      <div className="flex items-center gap-3">
        <time className="text-xs text-[#999] dark:text-[#777]">{post.date}</time>
        <div className="flex gap-1.5">{post.tags.slice(0, 3).map((tag) => <span key={tag} className="text-xs text-[#666] dark:text-[#999]">#{tag}</span>)}</div>
      </div>
    </article>
    </Link>
  );
}
