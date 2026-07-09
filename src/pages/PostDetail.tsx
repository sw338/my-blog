import { useParams, Link } from "react-router-dom";
import posts from "../data/posts";
import MarkdownRenderer from "../components/MarkdownRenderer";
import TableOfContents from "../components/TableOfContents";
import PostNavigation from "../components/PostNavigation";
import CommentSection from "../components/CommentSection";

// 估算阅读时长（中文约 400 字/分钟）
function estimateReadingTime(text: string): number {
  const charCount = text.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(charCount / 400));
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  // 404 — 文章未找到
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-6xl font-bold text-[#e5e5e5] dark:text-[#333333] mb-4">404</h1>
        <p className="text-lg text-[#666666] dark:text-[#999999] mb-6">文章未找到</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#2563eb] border border-[#2563eb] rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        >
          ← 返回首页
        </Link>
      </div>
    );
  }

  const readingTime = estimateReadingTime(post.content);
  const wordCount = post.content.replace(/\s/g, "").length;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <div className="flex gap-10">
        {/* 正文区 */}
        <article className="flex-1 min-w-0 max-w-3xl">
          {/* 文章头部 */}
          <header className="mb-8 pb-8 border-b border-[#e5e5e5] dark:border-[#333333]">
            {/* 分类 */}
            <span className="inline-block text-xs font-medium text-[#2563eb] bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full mb-4">
              {post.category}
            </span>

            {/* 标题 */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-4 leading-tight">
              {post.title}
            </h1>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#666666] dark:text-[#999999]">
              <time>{post.date}</time>
              <span className="w-1 h-1 rounded-full bg-[#e5e5e5] dark:bg-[#333333]" />
              <span>{wordCount.toLocaleString()} 字</span>
              <span className="w-1 h-1 rounded-full bg-[#e5e5e5] dark:bg-[#333333]" />
              <span>阅读约 {readingTime} 分钟</span>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#666666] dark:text-[#999999] bg-gray-100 dark:bg-[#333333] px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Markdown 正文 */}
          <MarkdownRenderer content={post.content} />

          {/* 上下篇导航 */}
          <PostNavigation currentSlug={post.slug} />

          {/* 评论区 */}
          <CommentSection slug={post.slug} />
        </article>

        {/* 右侧目录 — 桌面端 sticky */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <TableOfContents content={post.content} />
          </div>
        </aside>
      </div>

      {/* 移动端底部目录 */}
      <div className="lg:hidden mt-10 p-4 border border-[#e5e5e5] dark:border-[#333333] rounded-lg">
        <TableOfContents content={post.content} />
      </div>
    </div>
  );
}
