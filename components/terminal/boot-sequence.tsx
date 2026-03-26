"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const BOOT_MESSAGES = [
  { text: "[    0.000000] Linux version 6.5.0-dev-portfolio (gcc 13.2.0)", isOk: false, isSkill: false },
  { text: "[    0.000024] Command line: BOOT_IMAGE=/vmlinuz-6.5.0-dev root=/dev/sda1", isOk: false, isSkill: false },
  { text: "[    0.001234] BIOS-provided physical RAM map:", isOk: false, isSkill: false },
  { text: "[    0.001245] BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable", isOk: false, isSkill: false },
  { text: "[    0.002456] CPU: Intel(R) Core(TM) i9-13900K @ 5.80GHz", isOk: false, isSkill: false },
  { text: "[    0.003789] ACPI: Early table checksum verification disabled", isOk: false, isSkill: false },
  { text: "[  OK  ] Started System Logging Service.", isOk: true, isSkill: false },
  { text: "[  OK  ] Started Network Manager.", isOk: true, isSkill: false },
  { text: "[  OK  ] Reached target Network.", isOk: true, isSkill: false },
  { text: "[  OK  ] Started OpenSSH server daemon.", isOk: true, isSkill: false },
  { text: "[  OK  ] Initializing Developer Profile...", isOk: true, isSkill: false },
  { text: "", isOk: false, isSkill: false },
  { text: "Detecting skills...", isOk: false, isSkill: false },
  { text: "  - JavaScript ...................... [FOUND]", isOk: false, isSkill: true },
  { text: "  - TypeScript ...................... [FOUND]", isOk: false, isSkill: true },
  { text: "  - React ........................... [FOUND]", isOk: false, isSkill: true },
  { text: "  - Next.js ......................... [FOUND]", isOk: false, isSkill: true },
  { text: "  - Node.js ......................... [FOUND]", isOk: false, isSkill: true },
  { text: "  - Python .......................... [FOUND]", isOk: false, isSkill: true },
  { text: "  - PostgreSQL ...................... [FOUND]", isOk: false, isSkill: true },
  { text: "", isOk: false, isSkill: false },
  { text: "[  OK  ] All development tools loaded successfully.", isOk: true, isSkill: false },
  { text: "[  OK  ] Portfolio system ready.", isOk: true, isSkill: false },
]

const ASCII_LOGO = `
 ██████╗ ███████╗██╗   ██╗       ██████╗ ███████╗
 ██╔══██╗██╔════╝██║   ██║      ██╔═══██╗██╔════╝
 ██║  ██║█████╗  ██║   ██║█████╗██║   ██║███████╗
 ██║  ██║██╔══╝  ╚██╗ ██╔╝╚════╝██║   ██║╚════██║
 ██████╔╝███████╗ ╚████╔╝       ╚██████╔╝███████║
 ╚═════╝ ╚══════╝  ╚═══╝         ╚═════╝ ╚══════╝
                                                  
      Full Stack Developer Portfolio v1.0.0
`

const LINE_DELAY = 50
const MAX_BOOT_TIME = 2000

type BootSequenceProps = {
  onComplete: () => void
  skipRequested?: boolean
}

export function BootSequence({ onComplete, skipRequested }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [showLogo, setShowLogo] = useState(false)
  const [bootComplete, setBootComplete] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)

  const handleSkip = useCallback(() => {
    if (isSkipped) return
    setIsSkipped(true)
    setVisibleLines(BOOT_MESSAGES.map(m => m.text))
    setShowLogo(true)
    setBootComplete(true)
    setTimeout(onComplete, 300)
  }, [onComplete, isSkipped])

  // Handle external skip request (ESC key from parent)
  useEffect(() => {
    if (skipRequested && !isSkipped) {
      handleSkip()
    }
  }, [skipRequested, isSkipped, handleSkip])

  useEffect(() => {
    if (isSkipped) return

    let currentIndex = 0
    let timeoutId: NodeJS.Timeout
    const startTime = Date.now()

    const showNextLine = () => {
      const elapsed = Date.now() - startTime
      
      // Force complete if max time exceeded
      if (elapsed >= MAX_BOOT_TIME) {
        setVisibleLines(BOOT_MESSAGES.map(m => m.text))
        setShowLogo(true)
        setBootComplete(true)
        setTimeout(onComplete, 300)
        return
      }

      if (currentIndex < BOOT_MESSAGES.length) {
        const message = BOOT_MESSAGES[currentIndex]
        setVisibleLines((prev) => [...prev, message.text])
        currentIndex++
        timeoutId = setTimeout(showNextLine, LINE_DELAY)
      } else {
        setShowLogo(true)
        setTimeout(() => {
          setBootComplete(true)
          setTimeout(onComplete, 300)
        }, 400)
      }
    }

    timeoutId = setTimeout(showNextLine, 100)

    return () => clearTimeout(timeoutId)
  }, [onComplete, isSkipped])

  const formatLine = (line: string, index: number) => {
    const msg = BOOT_MESSAGES[index]
    
    if (msg?.isOk) {
      return (
        <span>
          <span className="text-primary">[  OK  ]</span>
          <span className="text-foreground">{line.replace("[  OK  ]", "")}</span>
        </span>
      )
    }
    
    if (msg?.isSkill) {
      const parts = line.split("[FOUND]")
      return (
        <span>
          <span className="text-muted-foreground">{parts[0]}</span>
          <span className="text-primary">[FOUND]</span>
        </span>
      )
    }
    
    if (line.startsWith("[")) {
      return <span className="text-muted-foreground">{line}</span>
    }
    
    return <span className="text-foreground">{line}</span>
  }

  return (
    <div className="h-full w-full overflow-hidden p-4 font-mono text-sm relative">
      {/* Skip Button */}
      {!bootComplete && (
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 px-3 py-1 text-xs text-muted-foreground hover:text-primary border border-muted-foreground/30 hover:border-primary/50 rounded transition-colors z-10"
        >
          Skip [ESC]
        </button>
      )}

      <AnimatePresence>
        {visibleLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.05 }}
            className="leading-relaxed"
          >
            {formatLine(line, index)}
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <pre className="ascii-art text-primary terminal-glow text-xs sm:text-sm leading-none">
              {ASCII_LOGO}
            </pre>
            
            {bootComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-muted-foreground"
              >
                Type <span className="text-primary">help</span> for available commands...
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
