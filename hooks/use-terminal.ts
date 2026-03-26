"use client"

import { useState, useCallback, useRef } from "react"

export type OutputLine = {
  id: string
  content: string | React.ReactNode
  type: "command" | "output" | "error" | "success" | "ascii" | "boot"
  timestamp: number
}

export type TerminalState = {
  history: string[]
  historyIndex: number
  currentInput: string
  outputBuffer: OutputLine[]
  currentPath: string
  isBooting: boolean
  bootComplete: boolean
}

export function useTerminal() {
  const [state, setState] = useState<TerminalState>({
    history: [],
    historyIndex: -1,
    currentInput: "",
    outputBuffer: [],
    currentPath: "~",
    isBooting: true,
    bootComplete: false,
  })

  const idCounter = useRef(0)

  const generateId = useCallback(() => {
    idCounter.current += 1
    return `line-${idCounter.current}-${Date.now()}`
  }, [])

  const addOutput = useCallback(
    (
      content: string | React.ReactNode,
      type: OutputLine["type"] = "output"
    ) => {
      setState((prev) => ({
        ...prev,
        outputBuffer: [
          ...prev.outputBuffer,
          {
            id: generateId(),
            content,
            type,
            timestamp: Date.now(),
          },
        ],
      }))
    },
    [generateId]
  )

  const addMultipleOutputs = useCallback(
    (lines: { content: string | React.ReactNode; type: OutputLine["type"] }[]) => {
      setState((prev) => ({
        ...prev,
        outputBuffer: [
          ...prev.outputBuffer,
          ...lines.map((line) => ({
            id: generateId(),
            content: line.content,
            type: line.type,
            timestamp: Date.now(),
          })),
        ],
      }))
    },
    [generateId]
  )

  const setInput = useCallback((input: string) => {
    setState((prev) => ({
      ...prev,
      currentInput: input,
      historyIndex: -1,
    }))
  }, [])

  const executeCommand = useCallback((command: string) => {
    if (!command.trim()) return

    setState((prev) => ({
      ...prev,
      history: [command, ...prev.history],
      historyIndex: -1,
      currentInput: "",
    }))

    addOutput(`user@portfolio:${state.currentPath}$ ${command}`, "command")
  }, [addOutput, state.currentPath])

  const navigateHistory = useCallback((direction: "up" | "down") => {
    setState((prev) => {
      const { history, historyIndex } = prev
      
      if (history.length === 0) return prev

      let newIndex = historyIndex
      
      if (direction === "up") {
        newIndex = Math.min(historyIndex + 1, history.length - 1)
      } else {
        newIndex = Math.max(historyIndex - 1, -1)
      }

      return {
        ...prev,
        historyIndex: newIndex,
        currentInput: newIndex === -1 ? "" : history[newIndex],
      }
    })
  }, [])

  const clearTerminal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      outputBuffer: [],
    }))
  }, [])

  const setPath = useCallback((path: string) => {
    setState((prev) => ({
      ...prev,
      currentPath: path,
    }))
  }, [])

  const setBootComplete = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isBooting: false,
      bootComplete: true,
    }))
  }, [])

  const prompt = `user@portfolio:${state.currentPath}$`

  return {
    ...state,
    prompt,
    addOutput,
    addMultipleOutputs,
    setInput,
    executeCommand,
    navigateHistory,
    clearTerminal,
    setPath,
    setBootComplete,
  }
}
