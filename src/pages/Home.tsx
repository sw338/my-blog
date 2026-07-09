import { useState } from "react";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import posts from "../data/posts";

const PAGE_SIZE = 4;

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <div>
      <Hero />

      {/* 文章卡片列表 */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="grid gap-6">
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* 加载更多按钮 */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="px-6 py-2.5 border border-[#e5e5e5] dark:border-[#333333] rounded-lg text-sm font-medium text-[#1a1a1a] dark:text-[#e5e5e5] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
            >
              加载更多
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
