export interface Post {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "React 19 新特性完全指南",
    slug: "react-19-new-features",
    date: "2026-06-15",
    category: "前端开发",
    tags: ["React", "JavaScript", "前端框架"],
    summary:
      "React 19 带来了 Server Components、Actions、新的 Hooks 等重大更新。本文从实战角度逐一解析这些新特性的用法和最佳实践，帮你快速上手。",
    content: `## 概述

React 19 是 React 框架迄今为止最重要的版本之一。它引入了 **Server Components**、**Actions**、**全新的 Hooks** 等革命性特性，彻底改变了我们构建 React 应用的方式。

## Server Components

Server Components 允许组件在服务端渲染，从而减少客户端的 JavaScript 体积。

\`\`\`tsx
// PostList.server.tsx
export default async function PostList() {
  const posts = await fetch("https://api.example.com/posts");
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

> **注意**：Server Components 不能使用 useState、useEffect 等客户端 Hook。如果你需要交互性，请在组件顶部添加 \`"use client"\` 指令。

## Actions

React 19 引入了 **Server Actions** 和 **useActionState** Hook，极大简化了表单处理：

\`\`\`tsx
// 使用 useActionState 处理表单
import { useActionState } from "react";

async function updateProfile(prevState, formData) {
  const name = formData.get("name");
  await saveToDatabase(name);
  return { success: true };
}

function ProfileForm() {
  const [state, formAction] = useActionState(updateProfile, null);
  return (
    <form action={formAction}>
      <input name="name" placeholder="Your name" />
      <button type="submit">保存</button>
    </form>
  );
}
\`\`\`

## 新的 Hooks

### useOptimistic

支持乐观更新，让 UI 在服务器响应之前就反映出预期状态：

\`\`\`tsx
const [optimisticMessages, addOptimistic] = useOptimistic(
  messages,
  (state, newMessage) => [...state, { ...newMessage, sending: true }]
);
\`\`\`

### useFormStatus

获取表单提交状态，轻松实现加载指示器。

## 总结

| 特性 | 类型 | 影响 |
|------|------|------|
| Server Components | 架构 | 🔴 重大 |
| Actions | API | 🔴 重大 |
| useOptimistic | Hook | 🟡 中等 |
| useFormStatus | Hook | 🟢 轻度 |
| Document Metadata | 内置 | 🟡 中等 |

React 19 是一次质的飞跃。建议逐步迁移，从 Actions 和新的 Hooks 开始，再考虑引入 Server Components。`,
  },
  {
    id: 2,
    title: "TypeScript 类型体操入门",
    slug: "typescript-type-gymnastics",
    date: "2026-06-10",
    category: "TypeScript",
    tags: ["TypeScript", "类型系统", "进阶"],
    summary:
      "从条件类型到模板字面量类型，从 infer 到递归类型，本文带你系统掌握 TypeScript 高级类型技巧，写出更安全的代码。",
    content: `## 为什么需要类型体操

TypeScript 的类型系统是 **图灵完备** 的。这意味着我们可以在类型层面做非常复杂的计算，从而在编译时捕获更多错误。

## 条件类型

条件类型是类型体操的基石：

\`\`\`ts
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<"hello">;  // "yes"
type B = IsString<42>;       // "no"
\`\`\`

## infer 关键字

\`infer\` 让我们能在条件类型中提取类型信息：

\`\`\`ts
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (x: number) => string;
type Result = GetReturnType<Fn>; // string
\`\`\`

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型让字符串层面的类型计算成为可能：

\`\`\`ts
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<"click">; // "onClick"
\`\`\`

## 递归类型

配合条件类型，我们可以实现递归的类型操作：

\`\`\`ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};
\`\`\`

> 递归类型在 TypeScript 4.1+ 中得到了更好的支持，但要注意递归深度限制（通常 50 层）。

## 常用工具类型速查

| 工具类型 | 作用 | 示例 |
|----------|------|------|
| \`Partial<T>\` | 所有属性变为可选 | \`Partial<User>\` |
| \`Required<T>\` | 所有属性变为必填 | \`Required<Config>\` |
| \`Pick<T, K>\` | 选取指定属性 | \`Pick<User, "name">\` |
| \`Omit<T, K>\` | 排除指定属性 | \`Omit<User, "password">\` |
| \`Record<K, V>\` | 构造对象类型 | \`Record<string, number>\` |

## 实践建议

1. **不要过度使用** — 类型体操应该服务于代码安全，而非炫技
2. **优先使用内置工具类型** — TypeScript 标准库已经提供了大量实用类型
3. **为复杂类型添加注释** — 你的同事会感谢你的`,
  },
  {
    id: 3,
    title: "使用 Tailwind CSS 构建现代化 UI",
    slug: "modern-ui-with-tailwind-css",
    date: "2026-05-28",
    category: "CSS",
    tags: ["Tailwind CSS", "UI设计", "前端"],
    summary:
      "Tailwind CSS 的 utility-first 理念彻底改变了前端样式编写方式。本文分享实际项目中使用 Tailwind 的进阶技巧与设计系统搭建经验。",
    content: `## Utility-First 的理念

Tailwind CSS 的核心哲学是 **utility-first**——使用小而单一用途的类来构建复杂界面，而不是编写自定义 CSS。

\`\`\`html
<!-- 传统方式 -->
<div class="card">
  <h2 class="card-title">标题</h2>
</div>

<!-- Tailwind 方式 -->
<div class="rounded-lg border bg-white p-6 shadow-sm">
  <h2 class="text-xl font-semibold text-gray-900">标题</h2>
</div>
\`\`\`

## 进阶技巧

### 1. 自定义设计系统

\`\`\`js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          500: "#2563eb",
          900: "#1e3a5f",
        },
      },
    },
  },
};
\`\`\`

### 2. 响应式设计

Tailwind 的断点系统让响应式变得简单：

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 卡片们 -->
</div>
\`\`\`

### 3. 暗色模式

\`\`\`html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <p>自动适配系统主题</p>
</div>
\`\`\`

> **提示**：在 \`tailwind.config.js\` 中设置 \`darkMode: "class"\` 可以让用户手动切换暗色模式。

## 常见布局模式

| 布局 | Tailwind 类名 |
|------|--------------|
| 居中容器 | \`max-w-6xl mx-auto px-4\` |
| Flex 居中 | \`flex items-center justify-center\` |
| 两栏布局 | \`grid grid-cols-1 md:grid-cols-3 gap-8\` |
| 固定顶栏 | \`fixed top-0 w-full z-50\` |
| Sticky 侧栏 | \`sticky top-20\` |

## 性能优化

- 使用 \`@apply\` 提取重复样式
- 生产构建自动 PurgeCSS，移除未使用的样式
- JIT 模式按需生成样式，开发体验极佳`,
  },
  {
    id: 4,
    title: "Node.js 性能优化实践",
    slug: "nodejs-performance-optimization",
    date: "2026-05-20",
    category: "后端开发",
    tags: ["Node.js", "性能优化", "后端"],
    summary:
      "从事件循环机制到内存管理，从数据库查询优化到缓存策略，全面梳理 Node.js 应用性能优化的关键路径和实战案例。",
    content: `## 理解事件循环

Node.js 的性能瓶颈往往与 **事件循环** 密切相关。理解事件循环的各个阶段是优化的第一步。

\`\`\`
    ┌───────────────────────────┐
 ┌─>│           timers          │
 │  └─────────────┬─────────────┘
 │  ┌─────────────┴─────────────┐
 │  │     pending callbacks     │
 │  └─────────────┬─────────────┘
 │  ┌─────────────┴─────────────┐
 │  │       idle, prepare       │
 │  └─────────────┬─────────────┘
 │  ┌─────────────┴─────────────┐
 │  │           poll            │
 │  └─────────────┬─────────────┘
 │  ┌─────────────┴─────────────┐
 │  │           check           │
 │  └─────────────┬─────────────┘
 │  ┌─────────────┴─────────────┐
 └──┤      close callbacks      │
    └───────────────────────────┘
\`\`\`

## 数据库查询优化

### 连接池配置

\`\`\`js
const pool = mysql.createPool({
  connectionLimit: 20,      // 根据并发量调整
  queueLimit: 0,
  waitForConnections: true,
});
\`\`\`

### 批量查询

\`\`\`js
// ❌ 循环查询 — N+1 问题
for (const user of users) {
  const posts = await db.query("SELECT * FROM posts WHERE user_id = ?", [user.id]);
}

// ✅ 批量查询
const ids = users.map((u) => u.id);
const posts = await db.query("SELECT * FROM posts WHERE user_id IN (?)", [ids]);
\`\`\`

## 缓存策略

> **缓存是性能优化的银弹**——合理的缓存策略可以将 API 响应时间从秒级降低到毫秒级。

| 缓存层级 | 适用场景 | TTL |
|----------|----------|-----|
| 内存缓存 | 热点数据、配置 | 秒~分钟 |
| Redis | 会话、API 结果 | 分钟~小时 |
| CDN | 静态资源 | 天~周 |
| 浏览器 | 不变的资源 | 长期 |

## 实践清单

1. 使用 \`node --inspect\` 分析 CPU profile
2. 用 Clinic.js 诊断事件循环阻塞
3. 数据库查询添加索引
4. 对热点 API 引入 Redis 缓存
5. 使用 Stream 处理大文件
6. 合理设置 Cluster 模式利用多核 CPU`,
  },
  {
    id: 5,
    title: "Vite 插件开发指南",
    slug: "vite-plugin-development-guide",
    date: "2026-05-12",
    category: "工程化",
    tags: ["Vite", "插件", "构建工具"],
    summary:
      "Vite 的插件生态日益丰富，但有时仍需要自定义插件。本文从插件 API 出发，手把手教你开发一个实用的 Vite 插件。",
    content: `## Vite 插件机制

Vite 插件基于 **Rollup 插件接口**，同时扩展了 Vite 特有的钩子。一个插件就是一个返回特定对象的函数。

\`\`\`ts
// my-plugin.ts
import type { Plugin } from "vite";

export default function myPlugin(): Plugin {
  return {
    name: "vite-plugin-my",
    enforce: "pre", // 或 "post"

    // Vite 特有钩子
    config(config) {
      // 修改用户配置
    },

    // Rollup 钩子
    resolveId(id) {
      if (id === "virtual:my-module") return id;
    },

    load(id) {
      if (id === "virtual:my-module") {
        return \`export default "Hello from virtual module"\`;
      }
    },

    // Vite 特有钩子
    transformIndexHtml(html) {
      return html.replace("</head>", "<script>...</script></head>");
    },
  };
}
\`\`\`

## 实用案例：自动生成站点地图

\`\`\`ts
import type { Plugin } from "vite";
import { writeFileSync } from "fs";

function sitemapPlugin(options: { hostname: string; pages: string[] }): Plugin {
  return {
    name: "vite-plugin-sitemap",
    closeBundle() {
      const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${options.pages
  .map((page) => \`  <url>
    <loc>\${options.hostname}\${page}</loc>
  </url>\`)
  .join("\\n")}
</urlset>\`;
      writeFileSync("dist/sitemap.xml", sitemap);
    },
  };
}
\`\`\`

## 钩子执行顺序

| 阶段 | 钩子 | 说明 |
|------|------|------|
| 启动 | \`config\` | 修改配置 |
| 启动 | \`configResolved\` | 确认最终配置 |
| 构建 | \`resolveId\` | 解析模块路径 |
| 构建 | \`load\` | 加载模块内容 |
| 构建 | \`transform\` | 转换模块代码 |
| 结束 | \`closeBundle\` | 输出最终产物 |

> **提示**：使用 \`enforce: "pre"\` 可以让插件在 Vite 核心插件之前执行，\`"post"\` 则在之后。

## 最佳实践

1. 插件名遵循 \`vite-plugin-xxx\` 命名规范
2. 所有外部依赖标记为 \`optionalDependencies\`
3. 提供 TypeScript 类型定义
4. 处理边界情况（Windows 路径、虚拟模块等）`,
  },
  {
    id: 6,
    title: "2026 前端技术趋势展望",
    slug: "frontend-trends-2026",
    date: "2026-04-28",
    category: "行业观察",
    tags: ["趋势", "前端", "年度总结"],
    summary:
      "AI 驱动的开发工具、WebAssembly 生态成熟、边缘计算普及——2026 年前端技术正在发生深刻变革，一文看清全貌。",
    content: `## AI 驱动的开发范式

2026 年，AI 已经深度融入了前端开发流程。从代码补全到自动化测试，AI 正在改变我们编写代码的方式。

- **AI 代码助手**：GitHub Copilot、Claude Code 等工具已成为标配
- **设计到代码**：Figma AI 可以直接生成可用的 React 组件
- **智能重构**：AI 驱动的代码审查和重构建议

## WebAssembly 生态成熟

WebAssembly (Wasm) 不再是实验性技术。2026 年的几个关键进展：

\`\`\`rust
// Rust → Wasm 编译，在前端运行高性能计算
#[wasm_bindgen]
pub fn process_image(data: &[u8]) -> Vec<u8> {
    // 图像处理逻辑
}
\`\`\`

## 边缘计算与 SSR 2.0

| 方案 | 渲染位置 | 适用场景 |
|------|----------|----------|
| CSR | 浏览器 | 后台管理系统 |
| SSR | 服务器 | 内容型网站 |
| SSG | 构建时 | 文档/博客 |
| ISR | CDN 边缘 | 电商/内容 |
| Edge SSR | 全球边缘节点 | 全球低延迟 |

> **边缘计算** 正在模糊前后端的边界。在距离用户最近的 CDN 节点执行服务端逻辑，可以将首字节时间降低到 50ms 以内。

## 值得关注的新兴技术

1. **Bun** — 已成长为成熟的 JavaScript 运行时和工具链
2. **Biome** — 统一的格式化和 linting 工具，替代 ESLint + Prettier
3. **Rolldown** — Vite 的 Rust 版本打包器
4. **CSS Anchor Positioning** — 原生 CSS 弹出层定位

## 总结

2026 年前端的关键词是 **融合**：AI 与开发的融合、前后端的融合、编译时与运行时的融合。保持学习，但不要追逐每一个新框架——选择适合自己和团队的技术栈才是最重要的。`,
  },
  {
    id: 7,
    title: "Git 高级用法：从 Rebase 到 Bisect",
    slug: "advanced-git-techniques",
    date: "2026-04-15",
    category: "工具",
    tags: ["Git", "版本控制", "效率"],
    summary:
      "除了 commit、push、pull，Git 还有很多强大的命令。掌握交互式 rebase、cherry-pick、bisect 等高级用法，提升协作效率。",
    content: `## 交互式 Rebase

\`git rebase -i\` 是整理提交历史最强大的工具：

\`\`\`bash
# 合并最近 3 个提交
git rebase -i HEAD~3
\`\`\`

进入交互界面后，你可以选择以下操作：

| 命令 | 作用 |
|------|------|
| \`pick\` | 保留该提交 |
| \`reword\` | 修改提交信息 |
| \`squash\` | 合并到上一个提交 |
| \`fixup\` | 合并并丢弃提交信息 |
| \`drop\` | 删除该提交 |
| \`edit\` | 暂停以修改提交内容 |

## Git Bisect — 二分查找 Bug

当你不确定 Bug 是哪个提交引入的，bisect 可以帮你快速定位：

\`\`\`bash
# 启动二分查找
git bisect start

# 标记当前版本有问题
git bisect bad HEAD

# 标记一个已知正常的版本
git bisect good v1.0.0

# Git 会自动 checkout 到中间的提交
# 测试后标记 good 或 bad
git bisect good   # 或
git bisect bad

# 重复直到找到第一个有问题的提交
git bisect reset  # 结束 bisect
\`\`\`

## Cherry-Pick

将特定提交应用到当前分支：

\`\`\`bash
# 单个提交
git cherry-pick abc123

# 连续范围
git cherry-pick abc123..def456

# 有冲突时
git cherry-pick abc123
# 解决冲突后：
git add .
git cherry-pick --continue
\`\`\`

> **最佳实践**：Cherry-pick 会创建新的提交哈希，如果原始提交也在目标分支中，合并时可能会产生冲突。尽量避免滥用。

## Git Reflog — 救命稻草

误操作后恢复：

\`\`\`bash
# 查看所有 HEAD 变更记录
git reflog

# 恢复到某个历史状态
git reset --hard HEAD@{2}
\`\`\`

## 总结

- **Rebase** 让历史更清晰，但不要在公共分支上使用
- **Bisect** 是找 Bug 的神器，比手动回溯快几个数量级
- **Cherry-pick** 适用于选择性合并
- **Reflog** 能救你于水火之中`,
  },
  {
    id: 8,
    title: "CSS Container Queries 实战",
    slug: "css-container-queries-in-action",
    date: "2026-04-02",
    category: "CSS",
    tags: ["CSS", "响应式", "Container Queries"],
    summary:
      "Container Queries 让组件根据自身容器尺寸而非视口大小来调整样式，彻底改变了响应式设计的范式。本文用真实案例演示其威力。",
    content: `## 什么是 Container Queries

传统的 Media Queries 只能基于 **视口** 大小调整样式。Container Queries 让组件能根据 **自身容器** 的尺寸来响应，真正实现了组件级的响应式设计。

## 基础用法

首先定义容器：

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}
\`\`\`

然后基于容器查询：

\`\`\`css
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 16px;
  }
}

@container card (min-width: 600px) {
  .card {
    grid-template-columns: 300px 1fr;
  }
}
\`\`\`

## 实战案例

同一个文章卡片组件在不同布局中自动适配：

\`\`\`html
<!-- 侧边栏中 — 垂直布局 -->
<aside style="width: 300px">
  <div class="post-container">
    <article class="post-card">...</article>
  </div>
</aside>

<!-- 主内容区 — 水平布局 -->
<main style="width: 700px">
  <div class="post-container">
    <article class="post-card">...</article>
  </div>
</main>
\`\`\`

## 与 Media Queries 的对比

| 特性 | Media Queries | Container Queries |
|------|--------------|-------------------|
| 查询基准 | 视口大小 | 容器大小 |
| 组件可复用 | ❌ 依赖页面布局 | ✅ 组件完全自治 |
| 嵌套组件 | 难以处理 | 天然支持 |
| 浏览器支持 | 所有浏览器 | Chrome 105+, Safari 16+ |

> Container Queries 是 CSS 发展史上最重要的里程碑之一。配合 \`:has()\` 选择器和 CSS Nesting，现代 CSS 的能力已经远超我们的想象。

## 最佳实践

1. **渐进增强** — 对不支持的浏览器提供合理的 fallback
2. **合理命名容器** — 使用语义化的 container-name
3. **不要过度嵌套** — 过多的 container 会影响性能
4. **搭配 :has() 使用** — 实现更灵活的组件样式`,
  },
];

export default posts;
