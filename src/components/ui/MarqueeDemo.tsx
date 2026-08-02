import React from "react"
import MarqueeAlongSvgPath from "./marquee-along-svg-path"

const path =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"

const imgs = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
    label: "Figma UI",
  },
  {
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=150&q=80",
    label: "Node Fastify",
  },
  {
    src: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=150&q=80",
    label: "Astro Astro",
  },
  {
    src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=150&q=80",
    label: "AI LLM",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80",
    label: "PostgreSQL",
  },
  {
    src: "https://images.unsplash.com/photo-1634973357973-f2ed255753e1?auto=format&fit=crop&w=150&q=80",
    label: "Redis Cache",
  },
  {
    src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=150&q=80",
    label: "Cloudflare",
  },
  {
    src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=150&q=80",
    label: "React 19",
  },
  {
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=150&q=80",
    label: "Cybersecurity",
  },
  {
    src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=150&q=80",
    label: "Social Hub",
  },
]

export default function MarqueeDemo() {
  return (
    <div className="w-full h-[360px] my-8 rounded-2xl border border-violet-500/20 bg-[#12101d]/60 backdrop-blur-xl overflow-hidden relative shadow-2xl flex flex-col justify-between p-4 group">
      {/* Decorative Header Badge */}
      <div className="flex items-center justify-between z-20 pointer-events-none px-2 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Interactive Stack Pipeline
        </div>
        <span className="text-xs font-medium text-violet-300/60 hidden sm:inline-block">
          Hover to Slow • Drag to Scrub
        </span>
      </div>

      <div className="w-full h-[280px] relative">
        <MarqueeAlongSvgPath
          path={path}
          viewBox="0 0 996 330"
          baseVelocity={4}
          slowdownOnHover={true}
          draggable={true}
          repeat={2}
          dragSensitivity={0.15}
          className="w-full h-full text-violet-500/30 dark:text-violet-400/20"
          showPath={true}
          responsive
          grabCursor
        >
          {imgs.map((img, i) => (
            <div
              key={i}
              className="group/item relative -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 hover:scale-125"
            >
              <div className="w-14 h-14 rounded-2xl border-2 border-white/20 dark:border-violet-500/30 shadow-xl overflow-hidden bg-zinc-900/80 p-1 backdrop-blur-sm">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover rounded-xl pointer-events-none"
                  draggable={false}
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity bg-black/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap border border-white/10 pointer-events-none">
                {img.label}
              </div>
            </div>
          ))}
        </MarqueeAlongSvgPath>
      </div>
    </div>
  )
}
