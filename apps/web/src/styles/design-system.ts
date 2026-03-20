// Design System Tokens
// Source of truth for all visual decisions - see DESIGN_SYSTEM.md

export const designTokens = {
  colors: {
    background: {
      page: "#FAFAF8", // Warm white, never pure white
      surface: "white",
      elevated: "white",
      footer: "rgb(15 23 42)", // slate-900
    },
    accent: {
      primary: "#7C3AED", // violet-500
      primaryDark: "#6D28D9", // violet-600
      success: "#10B981", // emerald-500
      warning: "#F59E0B", // amber-500
      error: "#F43F5E", // rose-500
    },
    text: {
      primary: "rgb(15 23 42)", // slate-900
      body: "rgb(51 65 85)", // slate-700
      secondary: "rgb(100 116 139)", // slate-500
      muted: "rgb(148 163 184)", // slate-400
      onDark: "rgb(148 163 184)", // slate-400
      onDarkHover: "rgb(203 213 225)", // slate-300
    },
    border: {
      card: "rgb(226 232 240)", // slate-200
      subtle: "rgb(241 245 249)", // slate-100
      input: "rgb(203 213 225)", // slate-300
    },
  },
  typography: {
    fonts: {
      display: "var(--font-display)",
      body: "var(--font-body)",
      mono: "var(--font-mono)",
    },
    scale: {
      hero: "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight",
      sectionHeading: "text-3xl md:text-4xl font-bold tracking-tight",
      cardHeading: "text-xl md:text-2xl font-bold",
      bodyLarge: "text-lg text-slate-600",
      body: "text-base text-slate-700",
      small: "text-sm text-slate-500",
      badge: "text-xs font-semibold uppercase tracking-wide",
      code: "text-sm",
    },
  },
  layout: {
    maxWidth: "max-w-4xl",
    sectionPadding: "py-16 md:py-24",
    sectionPaddingMobile: "py-12",
    contentPadding: "px-4 md:px-6",
    cardGrid: "grid grid-cols-1 md:grid-cols-3 gap-6",
    twoColumnGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
    stackGap: "space-y-16 md:space-y-24",
  },
  animation: {
    pageLoad: "animate-fade-up",
    scrollReveal: "animate-fade-in",
    hover: "transition-all duration-200",
    spring: "transition-all duration-200 ease-out",
  },
  components: {
    card: "bg-white rounded-2xl border border-slate-200 p-6 md:p-8",
    cardHover: "hover:shadow-md transition-shadow duration-200",
    badge: "rounded-full px-3 py-1 text-xs font-semibold",
    button: {
      primary:
        "bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors",
      secondary:
        "bg-white border border-slate-200 hover:border-violet-300 text-slate-700 rounded-xl px-6 py-3 font-semibold transition-colors",
      ghost:
        "text-violet-600 hover:bg-violet-50 rounded-xl px-4 py-2 font-medium transition-colors",
    },
    glassmorphism: "backdrop-blur-xl bg-white/80 border border-white/20",
    codeBlock: "bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm overflow-x-auto",
    inlineCode: "bg-slate-100 text-slate-700 rounded px-1.5 py-0.5 font-mono text-sm",
  },
} as const;
