"use client"

import { motion } from "framer-motion"
import { CornerDownLeft, Delete, ArrowUp, ArrowDown } from "lucide-react"

type VirtualKeyboardProps = {
  onKey: (key: string) => void
  onEnter: () => void
  onBackspace: () => void
  onHistoryUp: () => void
  onHistoryDown: () => void
}

export function VirtualKeyboard({
  onKey,
  onEnter,
  onBackspace,
  onHistoryUp,
  onHistoryDown,
}: VirtualKeyboardProps) {
  const quickCommands = ["help", "ls", "clear", "sudo "]

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur border-t border-border p-3 md:hidden z-40"
    >
      {/* Quick Commands */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => onKey(cmd)}
            className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded font-mono text-sm whitespace-nowrap hover:bg-primary/30 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Control Keys */}
      <div className="flex items-center justify-between gap-2">
        {/* History Navigation */}
        <div className="flex gap-2">
          <button
            onClick={onHistoryUp}
            className="p-3 bg-muted rounded border border-border hover:bg-muted/80 transition-colors"
            aria-label="Previous command"
          >
            <ArrowUp className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={onHistoryDown}
            className="p-3 bg-muted rounded border border-border hover:bg-muted/80 transition-colors"
            aria-label="Next command"
          >
            <ArrowDown className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Common Keys */}
        <div className="flex gap-2">
          <button
            onClick={() => onKey(" ")}
            className="px-6 py-3 bg-muted rounded border border-border hover:bg-muted/80 transition-colors"
            aria-label="Space"
          >
            <span className="text-foreground font-mono text-sm">Space</span>
          </button>
          <button
            onClick={() => onKey("-")}
            className="px-4 py-3 bg-muted rounded border border-border hover:bg-muted/80 transition-colors"
            aria-label="Hyphen"
          >
            <span className="text-foreground font-mono text-sm">-</span>
          </button>
        </div>

        {/* Action Keys */}
        <div className="flex gap-2">
          <button
            onClick={onBackspace}
            className="p-3 bg-muted rounded border border-border hover:bg-muted/80 transition-colors"
            aria-label="Backspace"
          >
            <Delete className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={onEnter}
            className="p-3 bg-primary rounded border border-primary hover:bg-primary/90 transition-colors"
            aria-label="Enter"
          >
            <CornerDownLeft className="h-5 w-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
