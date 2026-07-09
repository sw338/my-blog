import { useState, useEffect } from "react";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

interface CommentSectionProps {
  slug: string;
}

function formatTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;
  return new Date(timestamp).toLocaleDateString("zh-CN");
}

function loadComments(slug: string): Comment[] {
  try {
    const stored = localStorage.getItem(`comments_${slug}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveComments(slug: string, comments: Comment[]) {
  localStorage.setItem(`comments_${slug}`, JSON.stringify(comments));
}

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setComments(loadComments(slug));
  }, [slug]);

  function handleSubmit() {
    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();
    if (!trimmedAuthor || !trimmedContent) return;

    setSubmitting(true);
    const newComment: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      author: trimmedAuthor,
      content: trimmedContent,
      timestamp: Date.now(),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    saveComments(slug, updated);
    setAuthor("");
    setContent("");
    setSubmitting(false);
  }

  function handleDelete(id: string) {
    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);
    saveComments(slug, updated);
  }

  return (
    <section className="mt-12 pt-8 border-t border-[#e5e5e5] dark:border-[#333333]">
      {/* 标题 */}
      <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-6">
        评论 ({comments.length})
      </h2>

      {/* 评论输入区 */}
      <div className="mb-8 space-y-3">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="你的昵称"
          maxLength={30}
          className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#333333] rounded-lg bg-white dark:bg-[#242424] text-[#1a1a1a] dark:text-[#e5e5e5] placeholder:text-[#666666] dark:placeholder:text-[#999999] outline-none focus:border-[#2563eb] transition-colors"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下你的想法..."
          rows={3}
          maxLength={500}
          className="w-full px-3 py-2 text-sm border border-[#e5e5e5] dark:border-[#333333] rounded-lg bg-white dark:bg-[#242424] text-[#1a1a1a] dark:text-[#e5e5e5] placeholder:text-[#666666] dark:placeholder:text-[#999999] outline-none focus:border-[#2563eb] transition-colors resize-none"
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#666666] dark:text-[#999999]">
            {content.length}/500
          </span>
          <button
            onClick={handleSubmit}
            disabled={submitting || !author.trim() || !content.trim()}
            className="px-4 py-2 text-sm font-medium bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            提交评论
          </button>
        </div>
      </div>

      {/* 评论列表 */}
      {comments.length === 0 ? (
        <p className="text-center text-[#666666] dark:text-[#999999] py-10">
          暂无评论，快来抢沙发 🛋️
        </p>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-3 group"
            >
              {/* 头像占位 */}
              <div className="w-9 h-9 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">
                  {comment.author.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* 评论内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#1a1a1a] dark:text-[#e5e5e5]">
                    {comment.author}
                  </span>
                  <span className="text-xs text-[#666666] dark:text-[#999999]">
                    {formatTime(comment.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-[#1a1a1a] dark:text-[#e5e5e5] leading-relaxed break-words">
                  {comment.content}
                </p>
              </div>

              {/* 删除按钮 */}
              <button
                onClick={() => handleDelete(comment.id)}
                className="shrink-0 text-xs text-[#666666] dark:text-[#999999] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all mt-1"
                title="删除"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
