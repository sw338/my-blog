import { Link } from "react-router-dom";
import posts from "../data/posts";

export default function Archive() {
  // 按年月分组
  const grouped = new Map<string, typeof posts>();
  posts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      const d = new Date(post.date);
      const key = `${d.getFullYear()}年${d.getMonth() + 1}月`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(post);
    });

  const entries = Array.from(grouped.entries());

  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-8">归档</h1>

      {entries.map(([month, monthPosts]) => (
        <section key={month} className="mb-10">
          {/* 月份标题 */}
          <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-4 sticky top-20 bg-white dark:bg-[#1a1a1a] py-1 z-10">
            {month}
          </h2>

          {/* 时间线 */}
          <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-[#e5e5e5] dark:before:bg-[#333333]">
            {monthPosts.map((post) => (
              <div key={post.id} className="relative pb-5 last:pb-0">
                {/* 圆点 */}
                <span className="absolute left-[-1.15rem] top-2 w-2.5 h-2.5 rounded-full bg-[#2563eb] ring-4 ring-white dark:ring-[#1a1a1a]" />

                {/* 内容 */}
                <Link
                  to={`/posts/${post.slug}`}
                  className="block group"
                >
                  <time className="text-xs text-[#666666] dark:text-[#999999] mb-1 block">
                    {post.date}
                  </time>
                  <h3 className="text-base font-medium text-[#1a1a1a] dark:text-[#e5e5e5] group-hover:text-[#2563eb] transition-colors">
                    {post.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}

      {entries.length === 0 && (
        <p className="text-center text-[#666666] dark:text-[#999999] py-20">暂无文章</p>
      )}
    </div>
  );
}
