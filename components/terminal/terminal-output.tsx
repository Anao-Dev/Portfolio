"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import type { OutputLine } from "@/hooks/use-terminal"

type TerminalOutputProps = {
  lines: OutputLine[]
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines])

  const getLineClass = (type: OutputLine["type"]) => {
    switch (type) {
      case "command":
        return "text-primary terminal-glow"
      case "error":
        return "text-destructive"
      case "success":
        return "text-primary"
      case "ascii":
        return "text-primary terminal-glow"
      case "boot":
        return "text-muted-foreground"
      default:
        return "text-foreground"
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto terminal-scroll"
    >
      {lines.map((line) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className={`font-mono text-sm leading-relaxed whitespace-pre-wrap break-words ${getLineClass(line.type)}`}
        >
          {typeof line.content === "string" ? line.content : line.content}
        </motion.div>
      ))}
    </div>
  )
}
