"use client"

import { useRef, useEffect, KeyboardEvent } from "react"

type TerminalInputProps = {
  prompt: string
  value: string
  onChange: (value: string) => void
  onSubmit: (command: string) => void
  onHistoryNavigate: (direction: "up" | "down") => void
  disabled?: boolean
}

export function TerminalInput({
  prompt,
  value,
  onChange,
  onSubmit,
  onHistoryNavigate,
  disabled = false,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onSubmit(value)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      onHistoryNavigate("up")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      onHistoryNavigate("down")
    }
  }

  const handleClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      className="flex items-center gap-2 py-1 cursor-text"
      onClick={handleClick}
    >
      <span className="text-primary terminal-glow whitespace-nowrap font-mono">
        {prompt}
      </span>
      <div className="relative flex-1 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full bg-transparent border-none outline-none text-foreground font-mono caret-transparent"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
        <span
          className="absolute pointer-events-none text-foreground font-mono"
          style={{ left: `${value.length}ch` }}
        >
          <span className="cursor-blink inline-block w-[0.6em] h-[1.2em] bg-primary translate-y-[2px]" />
        </span>
      </div>
    </div>
  )
}
