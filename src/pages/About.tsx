export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
      {/* 个人信息区 */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
        {/* 头像占位 */}
        <div className="w-[120px] h-[120px] rounded-full bg-gray-200 dark:bg-[#333333] flex items-center justify-center shrink-0">
          <span className="text-4xl font-bold text-[#666666] dark:text-[#999999] select-none">
            B
          </span>
        </div>

        {/* 自我介绍 */}
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-3">关于我</h1>
          <p className="text-[#666666] dark:text-[#999999] leading-relaxed">
            你好！我是一名热爱技术的前端开发者，专注于 React 和 TypeScript
            技术栈。喜欢探索新技术，乐于分享学习心得和项目经验。
          </p>
          <p className="text-[#666666] dark:text-[#999999] leading-relaxed mt-2">
            这个博客记录了我学习过程中的思考和总结，希望能帮助到同样在技术道路上探索的朋友。
          </p>
        </div>
      </div>

      {/* 技术栈 + 联系方式 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 技术栈 */}
        <section className="border border-[#e5e5e5] dark:border-[#333333] rounded-lg p-6 bg-white dark:bg-[#242424]">
          <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-4">技术栈</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "TypeScript",
              "Vite",
              "Tailwind CSS",
              "Node.js",
              "Next.js",
              "PostgreSQL",
              "Docker",
              "Git",
              "Figma",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-[#2563eb] rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 联系方式 */}
        <section className="border border-[#e5e5e5] dark:border-[#333333] rounded-lg p-6 bg-white dark:bg-[#242424]">
          <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-4">联系方式</h2>
          <div className="space-y-4">
            {/* Email */}
            <a
              href="mailto:3390353558@qq.com"
              className="flex items-center gap-3 text-sm text-[#666666] dark:text-[#999999] hover:text-[#2563eb] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              3390353558@qq.com
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/sw338"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-[#666666] dark:text-[#999999] hover:text-[#2563eb] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
              </svg>
              GitHub
            </a>

          </div>
        </section>
      </div>
    </div>
  );
}
