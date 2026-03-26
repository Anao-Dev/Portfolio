"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const PROJECTS = [
  {
    name: "Portal ATLAS",
    repo: "Portal_ATLAS",
    description: "Full management portal for gyms with back-end integration.",
    languages: [
      { name: "PHP", percentage: 94, color: "bg-purple-500" },
      { name: "JavaScript", percentage: 4, color: "bg-yellow-400" },
      { name: "CSS", percentage: 2, color: "bg-pink-400" },
    ],
    url: "https://github.com/Anao-Dev/Portal_ATLAS",
  },
  {
    name: "MatchLogo",
    repo: "MatchLogo",
    description: "Online dating web application with responsive interface and user interaction.",
    languages: [
      { name: "PHP", percentage: 96.4, color: "bg-purple-500" },
      { name: "HTML", percentage: 2, color: "bg-orange-500" },
      { name: "CSS", percentage: 1.6, color: "bg-pink-400" },
    ],
    url: "https://github.com/Anao-Dev/MatchLogo",
  },
  {
    name: "Kikiflix Memories",
    repo: "kikiflix-memories",
    description: "A modern TypeScript-based memory/media platform.",
    languages: [
      { name: "TypeScript", percentage: 97.7, color: "bg-blue-500" },
      { name: "CSS", percentage: 2.3, color: "bg-pink-400" },
    ],
    url: "https://github.com/Anao-Dev/kikiflix-memories",
  },
  {
    name: "Doceria da Bia",
    repo: "doceriadabia",
    description: "Web development project for a local confectionery/bakery business.",
    languages: [
      { name: "HTML", percentage: 45, color: "bg-orange-500" },
      { name: "CSS", percentage: 35, color: "bg-pink-400" },
      { name: "JavaScript", percentage: 20, color: "bg-yellow-400" },
    ],
    url: "https://github.com/Anao-Dev/doceriadabia",
  },
]

type GitHubModalProps = {
  onClose: () => void
}

export function GitHubModal({ onClose }: GitHubModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="rounded-xl w-full max-w-4xl max-h-[85vh] overflow-hidden border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Header - macOS style */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors shadow-inner"
                aria-label="Close"
              />
              <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-inner" />
            </div>
            <div className="ml-3 flex items-center gap-2">
              <span className="text-sm font-medium text-white/90 font-mono">
                ~/github/Anao-Dev
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-60px)]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <div className="font-mono text-sm text-muted-foreground">
                  <span className="text-primary">$</span> Fetching repositories from GitHub...
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-1">
                    Projects Repository
                  </h2>
                  <p className="text-sm text-white/60 font-mono">
                    <span className="text-primary">4</span> repositories found
                  </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROJECTS.map((project, index) => (
                    <motion.a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group block p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Project Name */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-mono font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                          <span className="text-primary/60">/</span>
                          {project.name}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Language Bar */}
                      <div className="mb-3">
                        <div className="h-2 w-full rounded-full overflow-hidden flex bg-white/10">
                          {project.languages.map((lang, langIndex) => (
                            <div
                              key={langIndex}
                              className={`${lang.color} transition-all duration-300`}
                              style={{ width: `${lang.percentage}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Language Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.languages.map((lang, langIndex) => (
                          <span
                            key={langIndex}
                            className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10"
                          >
                            <span className={`w-2 h-2 rounded-full ${lang.color}`} />
                            <span className="text-white/80">{lang.name}</span>
                            <span className="text-white/40">{lang.percentage}%</span>
                          </span>
                        ))}
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* View Profile Button */}
                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    className="bg-primary/20 border border-primary/50 text-primary hover:bg-primary hover:text-black font-mono transition-all duration-300"
                    asChild
                  >
                    <a
                      href="https://github.com/Anao-Dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="mr-2">$</span>
                      View Full Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
