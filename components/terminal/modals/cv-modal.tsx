"use client"

import { motion } from "framer-motion"
import { X, Download, Mail, MapPin, Globe, Briefcase, GraduationCap, Github, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type CVModalProps = {
  onClose: () => void
}

const PROJECTS = [
  {
    title: "Projeto: Atlas – Portal para Academias",
    tech: "HTML, CSS, JavaScript, Bootstrap, PHP",
    description: "Portal web focado na organização e gerenciamento de informações para academias com interface responsiva e integração back-end.",
    link: "https://github.com/Anao-Dev/Portal_ATLAS"
  },
  {
    title: "Projeto: MatchLogo – Web App de Relacionamento",
    tech: "HTML, CSS, Bootstrap, PHP",
    description: "Plataforma de interação entre usuários. Atualmente em fase de desenvolvimento e aprimoramento contínuo.",
    link: "https://github.com/Anao-Dev/MatchLogo"
  }
]

const EDUCATION = [
  {
    degree: "Bacharelado em Engenharia de Software",
    school: "Anhanguera",
    year: "2026 - 2030 (Previsão)",
  },
  {
    degree: "Ensino Médio + Técnico em Informática",
    school: "Colégio Lemos Rede de Ensino",
    year: "Concluído em 2025",
  },
]

const SKILLS = [
  "HTML5", "CSS3", "JavaScript", "PHP", "Tailwind CSS",
  "Bootstrap", "SQL", "Git", "Hardware Maintenance", "System Formatting"
]

export function CVModal({ onClose }: CVModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#1a1a1a]/90 border border-white/10 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl shadow-primary/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Header - Estilo macOS */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="ml-4 text-xs font-mono text-gray-400 uppercase tracking-widest">
              viewing: gabriel_porto_cv.pdf
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-thin scrollbar-thumb-primary">

          {/* Header */}
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Gabriel Porto de Oliveira</h1>
            <p className="text-primary font-mono text-lg mb-4">Engenheiro de Software em Formação</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> madaraeobito541@gmail.com</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Rio de Janeiro, RJ</span>
              <span className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> github.com/Anao-Dev</span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Coluna Esquerda: Skills e Educação */}
            <div className="space-y-8">
              <section>
                <h2 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-tighter mb-4 border-b border-primary/30 pb-1">
                  <GraduationCap className="h-4 w-4 text-primary" /> Formação
                </h2>
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-sm font-semibold text-gray-200">{edu.degree}</p>
                    <p className="text-xs text-gray-400">{edu.school}</p>
                    <p className="text-[10px] font-mono text-primary mt-1">{edu.year}</p>
                  </div>
                ))}
              </section>

              <section>
                <h2 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-tighter mb-4 border-b border-primary/30 pb-1">
                  <Code2 className="h-4 w-4 text-primary" /> Tecnologias
                </h2>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span key={skill} className="px-2 py-1 text-[10px] bg-primary/5 text-primary border border-primary/20 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Coluna Direita: Resumo e Projetos */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-sm font-bold text-white uppercase tracking-tighter mb-3">Objetivo & Resumo</h2>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  "Jovem em início de carreira focado em Desenvolvimento de Software. Conhecimentos sólidos em estruturação web, estilização responsiva e noções de manutenção de hardware."
                </p>
              </section>

              <section>
                <h2 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-tighter mb-4 border-b border-primary/30 pb-1">
                  <Briefcase className="h-4 w-4 text-primary" /> Projetos em Destaque
                </h2>
                <div className="space-y-6">
                  {PROJECTS.map((proj, i) => (
                    <div key={i} className="group p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 transition-all">
                      <h3 className="text-gray-200 font-bold mb-1 flex justify-between items-center">
                        {proj.title}
                        <a href={proj.link} target="_blank" className="text-primary hover:scale-110 transition-transform">
                          <Github className="h-4 w-4" />
                        </a>
                      </h3>
                      <p className="text-[11px] font-mono text-primary/80 mb-2">{proj.tech}</p>
                      <p className="text-sm text-gray-400">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
          <p className="text-[10px] text-gray-500 font-mono italic">Gabriel Porto © 2026 - v1.0.4</p>
          <Button className="bg-primary hover:bg-primary/80 text-black font-bold h-9 px-6 transition-all active:scale-95">
            <Download className="mr-2 h-4 w-4" />
            BAIXAR PDF
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}