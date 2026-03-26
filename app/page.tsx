"use client"

import { useState, useEffect } from "react"
import { Terminal } from "@/components/terminal/terminal"

type Theme = "matrix" | "dracula" | "ubuntu" | "retro"

export default function PortfolioPage() {
  const [theme, setTheme] = useState<Theme>("matrix")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("terminal-theme") as Theme | null
    if (savedTheme && ["matrix", "dracula", "ubuntu", "retro"].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("terminal-theme", newTheme)
  }

  if (!mounted) {
    return (
      <main className="h-screen w-screen bg-background flex items-center justify-center">
        <div className="text-primary font-mono animate-pulse">
          Initializing...
        </div>
      </main>
    )
  }

  return (
    <main
      data-theme={theme}
      className="h-screen w-screen overflow-hidden"
    >
      <Terminal onThemeChange={handleThemeChange} />
    </main>
  )
}
