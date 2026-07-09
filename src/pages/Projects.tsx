import projects from "../data/projects";

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-2">
        我的项目
      </h1>
      <p className="text-[#666666] dark:text-[#999999] mb-8">
        一些个人开发和参与的开源项目
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="border border-[#e5e5e5] dark:border-[#333333] rounded-lg overflow-hidden bg-white dark:bg-[#242424] hover:shadow-md transition-shadow duration-200 flex flex-col"
          >
            {/* 占位图 */}
            <div className="h-36 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white/80 select-none">
                {project.name.charAt(0)}
              </span>
            </div>

            {/* 内容 */}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-semibold text-[#1a1a1a] dark:text-[#e5e5e5] mb-2">
                {project.name}
              </h2>
              <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#666666] dark:text-[#999999] bg-gray-100 dark:bg-[#333333] px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 链接 */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#e5e5e5] dark:border-[#333333]">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#666666] dark:text-[#999999] hover:text-[#2563eb] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
                    </svg>
                    源码
                  </a>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#2563eb] hover:text-blue-700 transition-colors"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  预览
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
