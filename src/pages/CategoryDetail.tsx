import { useParams, Link } from "react-router-dom";
import posts from "../data/posts";
import PostCard from "../components/PostCard";

export default function CategoryDetail() {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name || "");
  const filteredPosts = posts.filter((p) => p.category === decodedName);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-2">
        {decodedName}
      </h1>
      <p className="text-sm text-[#666666] dark:text-[#999999] mb-8">
        共 {filteredPosts.length} 篇文章
      </p>

      {/* 文章列表 / 空状态 */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#666666] dark:text-[#999999] mb-4">该分类下暂无文章</p>
          <Link
            to="/categories"
            className="text-sm text-[#2563eb] hover:underline"
          >
            ← 返回分类列表
          </Link>
        </div>
      )}
    </div>
  );
}
