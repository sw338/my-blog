export interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "个人博客",
    description:
      "基于 React + TypeScript + Vite + Tailwind CSS 构建的现代化个人博客，支持 Markdown 渲染、暗色模式、全文搜索等功能。",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://stupendous-hotteok-8a8e16.netlify.app",
    github: "https://github.com/sw338/my-blog",
  },
  {
    id: 2,
    name: "Todo App",
    description:
      "简洁的待办事项应用，支持添加、编辑、完成、删除功能，localStorage 本地持久化存储，界面清爽美观。",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://sw338.github.io/todo-app/",
    github: "https://github.com/sw338/todo-app",
  },
  {
    id: 3,
    name: "天气查询",
    description:
      "城市天气查询工具，支持搜索联想、实时天气展示、未来三天预报，根据温度动态切换背景主题。",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://sw338.github.io/weather-app/",
    github: "https://github.com/sw338/weather-app",
  },
  {
    id: 4,
    name: "UI 组件库",
    description:
      "React + Tailwind CSS 组件演示库，包含 Button、Card、Modal、Toast、Input 等组件及代码示例。",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://sw338.github.io/ui-library/",
    github: "https://github.com/sw338/ui-library",
  },
  {
    id: 5,
    name: "数据可视化 Dashboard",
    description:
      "数据分析仪表盘，使用 Recharts 实现折线图、柱状图、饼图，展示用户增长、收入、渠道分布等指标。",
    tags: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    link: "https://sw338.github.io/dashboard/",
    github: "https://github.com/sw338/dashboard",
  },
  {
    id: 6,
    name: "AI 聊天助手",
    description:
      "精美的 AI 对话界面，支持消息气泡、打字动画、模拟智能回复，响应式设计适配移动端。",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://sw338.github.io/ai-chat/",
    github: "https://github.com/sw338/ai-chat",
  },
];

export default projects;
