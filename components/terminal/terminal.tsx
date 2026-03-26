"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { useTerminal } from "@/hooks/use-terminal"
import { BootSequence } from "./boot-sequence"
import { TerminalInput } from "./terminal-input"
import { TerminalOutput } from "./terminal-output"
import { VirtualKeyboard } from "./virtual-keyboard"
import { processCommand } from "./commands"
import { GitHubModal } from "./modals/github-modal"
import { CVModal } from "./modals/cv-modal"
import { SkillsModal } from "./modals/skills-modal"
import { MailModal } from "./modals/mail-modal"

type ModalType = "github" | "cv" | "skills" | "mail" | null

type TerminalProps = {
  onThemeChange: (theme: "matrix" | "dracula" | "ubuntu" | "retro") => void
}

export function Terminal({ onThemeChange }: TerminalProps) {
  const [skipBoot, setSkipBoot] = useState(false)
  const {
    outputBuffer,
    currentInput,
    currentPath,
    isBooting,
    bootComplete,
    prompt,
    addOutput,
    addMultipleOutputs,
    setInput,
    executeCommand,
    navigateHistory,
    clearTerminal,
    setPath,
    setBootComplete,
  } = useTerminal()

  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [isMobile, setIsMobile] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // ESC key to skip boot sequence
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isBooting) {
        setSkipBoot(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isBooting])

  const handleCommand = useCallback(
    (command: string) => {
      executeCommand(command)

      const result = processCommand(command, { currentPath })

      if (result.clear) {
        clearTerminal()
        return
      }

      if (result.output.length > 0) {
        addMultipleOutputs(result.output)
      }

      if (result.newPath) {
        setPath(result.newPath)
      }

      if (result.openModal) {
        setActiveModal(result.openModal)
      }

      if (result.setTheme) {
        onThemeChange(result.setTheme)
      }
    },
    [
      currentPath,
      executeCommand,
      addMultipleOutputs,
      clearTerminal,
      setPath,
      onThemeChange,
    ]
  )

  const handleVirtualKey = useCallback(
    (key: string) => {
      setInput(currentInput + key)
    },
    [currentInput, setInput]
  )

  const handleVirtualEnter = useCallback(() => {
    handleCommand(currentInput)
  }, [currentInput, handleCommand])

  const handleVirtualBackspace = useCallback(() => {
    setInput(currentInput.slice(0, -1))
  }, [currentInput, setInput])

  const handleTerminalClick = () => {
    // Focus the input when clicking anywhere on the terminal
    const input = terminalRef.current?.querySelector("input")
    input?.focus()
  }

  return (
    <>
      <div
        ref={terminalRef}
        className="relative flex flex-col h-full w-full crt-scanlines crt-flicker cursor-text"
        style={{ backgroundColor: "var(--terminal-bg)" }}
        onClick={handleTerminalClick}
      >
        {/* Terminal Content */}
        <div className={`flex-1 flex flex-col p-4 overflow-hidden ${isMobile ? "pb-28" : ""}`}>
          {isBooting ? (
            <BootSequence onComplete={setBootComplete} skipRequested={skipBoot} />
          ) : (
            <>
              <TerminalOutput lines={outputBuffer} />
              {bootComplete && (
                <TerminalInput
                  prompt={prompt}
                  value={currentInput}
                  onChange={setInput}
                  onSubmit={handleCommand}
                  onHistoryNavigate={navigateHistory}
                />
              )}
            </>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 text-xs font-mono text-muted-foreground border-t border-border/30 bg-secondary/20">
          <span>
            portfolio@dev-os:{currentPath}
          </span>
          <span className="flex items-center gap-4">
            <span className="hidden sm:inline">UTF-8</span>
            <span className="hidden sm:inline">LF</span>
            <span>Type &apos;help&apos; for commands</span>
          </span>
        </div>
      </div>

      {/* Virtual Keyboard (Mobile Only) */}
      {isMobile && bootComplete && !isBooting && (
        <VirtualKeyboard
          onKey={handleVirtualKey}
          onEnter={handleVirtualEnter}
          onBackspace={handleVirtualBackspace}
          onHistoryUp={() => navigateHistory("up")}
          onHistoryDown={() => navigateHistory("down")}
        />
      )}

      {/* Modals */}
      <AnimatePresence>
        {activeModal === "github" && (
          <GitHubModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "cv" && (
          <CVModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "skills" && (
          <SkillsModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "mail" && (
          <MailModal onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
