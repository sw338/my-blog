export default function Hero() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-16 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-4 tracking-tight">
        我的博客
      </h1>
      <p className="text-lg md:text-xl text-[#666666] dark:text-[#999999] font-light">
        记录技术，分享生活
      </p>
      <div className="mt-6 w-16 h-0.5 bg-[#2563eb] mx-auto rounded-full" />
    </section>
  );
}
