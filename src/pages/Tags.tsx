import { Link } from "react-router-dom";
import posts from "../data/posts";

export default function Tags() {
  const tagMap = new Map<string, number>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  const tags = Array.from(tagMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-8">标签</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {tags.map(([name, count]) => (
          <Link
            key={name}
            to={`/tags/${encodeURIComponent(name)}`}
            className="flex items-center justify-between text-sm px-3 py-2 rounded-lg border border-[#e5e5e5] dark:border-[#333333] text-[#1a1a1a] dark:text-[#e5e5e5] hover:text-[#2563eb] hover:border-[#2563eb] transition-colors truncate"
            title={`${name} (${count} 篇)`}
          >
            <span className="truncate">{name}</span>
            <span className="text-xs text-[#666666] dark:text-[#999999] shrink-0 ml-1">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
