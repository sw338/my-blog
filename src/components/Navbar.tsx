import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const navLinks = [
  { to: "/", label: "首页" },
  { to: "/categories", label: "分类" },
  { to: "/tags", label: "标签" },
  { to: "/archive", label: "归档" },
  { to: "/projects", label: "项目" },
  { to: "/about", label: "关于" },
];

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { dark, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border-b border-[#e5e5e5] dark:border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 左侧站点名 */}
        <Link
          to="/"
          className="text-xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] hover:text-[#2563eb] transition-colors"
        >
          我的博客
        </Link>

        {/* 中间导航菜单 — 桌面端 */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-[#2563eb] ${
                  location.pathname === link.to
                    ? "text-[#2563eb]"
                    : "text-[#1a1a1a] dark:text-[#e5e5e5]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 右侧：主题切换 + 搜索图标 + 汉堡 */}
        <div className="flex items-center gap-3">
          {/* 主题切换按钮 */}
          <button
            onClick={toggle}
            className="text-[#1a1a1a] dark:text-[#e5e5e5] hover:text-[#2563eb] transition-colors p-1"
            aria-label={dark ? "切换亮色模式" : "切换暗色模式"}
          >
            {dark ? (
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
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
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
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* 搜索图标 */}
          <button
            onClick={onSearchClick}
            className="text-[#1a1a1a] dark:text-[#e5e5e5] hover:text-[#2563eb] transition-colors"
            aria-label="搜索"
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
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </button>

          {/* 移动端汉堡菜单 */}
          <button
            className="md:hidden text-[#1a1a1a] dark:text-[#e5e5e5] hover:text-[#2563eb] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e5e5e5] dark:border-[#333333] bg-white dark:bg-[#1a1a1a]">
          <ul className="flex flex-col px-4 py-3 gap-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors hover:text-[#2563eb] ${
                    location.pathname === link.to
                      ? "text-[#2563eb]"
                      : "text-[#1a1a1a] dark:text-[#e5e5e5]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
