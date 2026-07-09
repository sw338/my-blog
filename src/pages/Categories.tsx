import { Link } from "react-router-dom";
import posts from "../data/posts";

export default function Categories() {
  // 提取去重分类并统计文章数
  const categoryMap = new Map<string, number>();
  posts.forEach((post) => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
  });
  const categories = Array.from(categoryMap.entries());

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-8">分类</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(([name, count]) => (
          <Link
            key={name}
            to={`/categories/${encodeURIComponent(name)}`}
            className="group border border-[#e5e5e5] dark:border-[#333333] rounded-lg p-6 bg-white dark:bg-[#242424] hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-lg font-semibold text-[#1a1a1a] dark:text-[#e5e5e5] group-hover:text-[#2563eb] transition-colors">
              {name}
            </h2>
            <p className="text-sm text-[#666666] dark:text-[#999999] mt-1">
              {count} 篇文章
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
