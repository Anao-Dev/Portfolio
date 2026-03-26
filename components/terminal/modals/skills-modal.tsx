"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

type SkillsModalProps = {
  onClose: () => void
}

type Skill = {
  name: string
  level: number
}

type SkillCategory = {
  title: string
  tag: string
  skills: Skill[]
}

const SKILLS_DATA: SkillCategory[] = [
  {
    title: "DEVELOPMENT",
    tag: "dev",
    skills: [
      { name: "HTML5 / CSS3", level: 80 },
      { name: "JavaScript", level: 65 },
      { name: "PHP", level: 60 },
      { name: "Bootstrap / Tailwind CSS", level: 75 },
    ],
  },
  {
    title: "INFRASTRUCTURE",
    tag: "infra",
    skills: [
      { name: "SQL (MySQL/PostgreSQL)", level: 55 },
      { name: "Git / GitHub", level: 70 },
      { name: "Hardware Maintenance", level: 85 },
      { name: "OS Formatting & Setup", level: 90 },
    ],
  },
  {
    title: "ACADEMIC",
    tag: "edu",
    skills: [
      { name: "Software Engineering (In Progress)", level: 45 },
      { name: "Technical Informatics (Completed)", level: 100 },
    ],
  },
]

function SkillBar({ 
  name, 
  level, 
  delay,
  isVisible 
}: { 
  name: string
  level: number
  delay: number
  isVisible: boolean 
}) {
  const totalBars = 20
  const filledBars = Math.floor((level / 100) * totalBars)
  const emptyBars = totalBars - filledBars

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay, duration: 0.3 }}
      className="font-mono text-sm"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-muted-foreground">$</span>
        <span className="text-foreground flex-1">{name}</span>
        <span className="text-primary font-bold">{level}%</span>
      </div>
      <div className="flex items-center gap-1 ml-4">
        <span className="text-muted-foreground">[</span>
        <motion.span
          initial={{ width: 0 }}
          animate={isVisible ? { width: "auto" } : { width: 0 }}
          transition={{ delay: delay + 0.1, duration: 0.5 }}
          className="inline-block overflow-hidden whitespace-nowrap"
        >
          <span className="text-primary terminal-glow">
            {"█".repeat(filledBars)}
          </span>
        </motion.span>
        <span className="text-muted-foreground/40">
          {"░".repeat(emptyBars)}
        </span>
        <span className="text-muted-foreground">]</span>
      </div>
    </motion.div>
  )
}

export function SkillsModal({ onClose }: SkillsModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCategories, setVisibleCategories] = useState<number>(0)

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(loadTimer)
  }, [])

  useEffect(() => {
    if (!isLoading && visibleCategories < SKILLS_DATA.length) {
      const timer = setTimeout(() => {
        setVisibleCategories((prev) => prev + 1)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [isLoading, visibleCategories])

  const totalSkills = SKILLS_DATA.reduce((acc, cat) => acc + cat.skills.length, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="glass-modal rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                aria-label="Close"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-4 text-sm font-medium text-foreground font-mono">
              skills --analyze --verbose
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-60px)] bg-black/20">
          {/* ASCII Header */}
          <pre className="text-primary terminal-glow text-xs mb-6 text-center leading-tight">
{`╔════════════════════════════════════════════════════════════╗
║           SKILL PROFICIENCY ANALYSIS v2.0                  ║
║              Runtime: DEV-OS Portfolio                     ║
╚════════════════════════════════════════════════════════════╝`}
          </pre>

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 font-mono"
            >
              <div className="text-primary terminal-glow mb-4">
                <span className="animate-pulse">Fetching skill data...</span>
              </div>
              <div className="text-muted-foreground text-sm">
                <span className="inline-block animate-spin mr-2">|</span>
                Loading proficiency metrics
              </div>
            </motion.div>
          ) : (
            <>
              {SKILLS_DATA.map((category, catIndex) => (
                <motion.div
                  key={category.tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    catIndex < visibleCategories
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-primary font-mono mb-4 flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">[</span>
                    {category.title}
                    <span className="text-muted-foreground">]</span>
                    <span className="text-muted-foreground/50 text-xs ml-2">
                      // {category.skills.length} entries
                    </span>
                  </h3>
                  <div className="space-y-4 pl-2 border-l-2 border-primary/20">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        delay={skillIndex * 0.08}
                        isVisible={catIndex < visibleCategories}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: visibleCategories >= SKILLS_DATA.length ? 1 : 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-4 border-t border-white/10 font-mono text-xs"
              >
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>
                    <span className="text-primary">$</span> Analysis complete
                  </span>
                  <span>
                    Total skills indexed: <span className="text-primary">{totalSkills}</span>
                  </span>
                </div>
                <div className="mt-2 text-muted-foreground/60">
                  <span className="text-green-500">SUCCESS</span> Proficiency data loaded from ~/.config/skills.json
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
