"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Send, Mail, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

type MailModalProps = {
  onClose: () => void
}

export function MailModal({ onClose }: MailModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

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
        className="glass-modal rounded-lg w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Header - Retro Dialog Style */}
        <div className="flex items-center justify-between px-4 py-3 bg-secondary border-b-2 border-border">
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
            <span className="ml-4 text-sm font-mono font-medium text-foreground">
              mail --compose
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* ASCII Header */}
          <pre className="text-primary terminal-glow text-xs mb-6 text-center font-mono">
{`
┌────────────────────────────────────┐
│     CONTACT FORM - Send Message    │
│          [ SECURE CONNECTION ]      │
└────────────────────────────────────┘
`}
          </pre>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="text-primary terminal-glow text-4xl mb-4">
                [OK]
              </div>
              <p className="text-foreground font-mono">
                Message sent successfully!
              </p>
              <p className="text-muted-foreground text-sm mt-2 font-mono">
                Thank you for reaching out. I will respond soon.
              </p>
              <Button
                onClick={onClose}
                className="mt-6 bg-primary text-primary-foreground"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-2">
                  <User className="h-4 w-4" />
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded font-mono text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded font-mono text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-2">
                  <MessageSquare className="h-4 w-4" />
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-input border border-border rounded font-mono text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Type your message here..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-pulse">Sending...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </div>

              {/* Terminal-style footer */}
              <div className="pt-4 text-center">
                <p className="text-xs text-muted-foreground font-mono">
                  $ mail --to contact@portfolio.dev --subject &quot;New Message&quot;
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
