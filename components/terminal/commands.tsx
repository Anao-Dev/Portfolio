"use client"

import type { OutputLine } from "@/hooks/use-terminal"

export type CommandResult = {
  output: { content: string | React.ReactNode; type: OutputLine["type"] }[]
  newPath?: string
  openModal?: "github" | "cv" | "skills" | "mail"
  setTheme?: "matrix" | "dracula" | "ubuntu" | "retro"
  clear?: boolean
}

type CommandContext = {
  currentPath: string
}

const DIRECTORIES = {
  "~": ["projects", "skills", "contact", "about"],
  "~/projects": ["portfolio", "ecommerce", "api-server", "mobile-app"],
  "~/skills": ["frontend", "backend", "devops"],
  "~/contact": ["email", "github", "linkedin"],
  "~/about": ["education", "experience"],
}

const HELP_TABLE = `
┌─────────────────────────────────────────────────────────────────────────┐
│                          AVAILABLE COMMANDS                              │
├─────────────────────────────────────────────────────────────────────────┤
│  COMMAND              │  DESCRIPTION                                     │
├─────────────────────────────────────────────────────────────────────────┤
│  help                 │  Show this help message                          │
│  whoami               │  Display developer bio                           │
│  ls                   │  List directory contents                         │
│  cd [folder]          │  Change directory                                │
│  clear                │  Clear terminal screen                           │
├─────────────────────────────────────────────────────────────────────────┤
│                         SUDO COMMANDS (GUI)                              │
├─────────────────────────────────────────────────────────────────────────┤
│  sudo github          │  Open GitHub repositories viewer                 │
│  sudo cv              │  Open interactive CV/Resume                      │
│  sudo skills          │  Display skills proficiency chart                │
│  sudo mail            │  Open contact form                               │
│  sudo themes --[name] │  Change theme (matrix/dracula/ubuntu/retro)      │
└─────────────────────────────────────────────────────────────────────────┘
`

const WHOAMI_BIO = `
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                  [ PERFIL DE USUÁRIO ATIVADO ]
  --------------------------------------------------
              NOME:     Gabriel Porto de Oliveira
              IDADE:    17 Anos
              LOCAL:    Honório Gurgel, Rio de Janeiro - RJ
              CARGO:    Estudante de Engenharia de Software
              STATUS:   Codificando o futuro, um commit por vez...
              --------------------------------------------------

              SOBRE MIM:
              Sou um desenvolvedor da geração 2008, focado em unir o mundo do 
              hardware com a potência do software. Com formação técnica em 
              Informática (2025) e cursando Bacharelado em Engenharia de 
              Software (Previsão 2030), dedico-me a criar aplicações web 
              funcionais, modernas e responsivas.

              FILOSOFIA DE CÓDIGO:
              "Código é como uma piada. Se você tem que explicar, é porque 
              ele é ruim." Busco arquiteturas limpas utilizando PHP, JavaScript 
              e frameworks modernos para resolver problemas reais.

              OBJETIVO ATUAL:
              Aplicar meus conhecimentos técnicos em um ambiente profissional, 
              contribuindo para projetos inovadores enquanto domino ecossistemas 
              Full Stack avançados.

              --------------------------------------------------
              Digite 'ls' para explorar meus diretórios ou 'sudo skills' 
              para checar as especificações do meu sistema.      
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
`

export function processCommand(
  command: string,
  context: CommandContext
): CommandResult {
  const trimmed = command.trim().toLowerCase()
  const parts = trimmed.split(/\s+/)
  const cmd = parts[0]
  const args = parts.slice(1)

  switch (cmd) {
    case "help":
      return {
        output: [{ content: HELP_TABLE, type: "output" }],
      }

    case "whoami":
      return {
        output: [{ content: WHOAMI_BIO, type: "success" }],
      }

    case "ls":
      return handleLs(context.currentPath)

    case "cd":
      return handleCd(args[0], context.currentPath)

    case "clear":
      return { output: [], clear: true }

    case "sudo":
      return handleSudo(args)

    case "":
      return { output: [] }

    default:
      return {
        output: [
          {
            content: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
            type: "error",
          },
        ],
      }
  }
}

function handleLs(currentPath: string): CommandResult {
  const normalizedPath = currentPath === "~" ? "~" : currentPath
  const contents = DIRECTORIES[normalizedPath as keyof typeof DIRECTORIES]

  if (!contents) {
    return {
      output: [
        {
          content: `ls: cannot access '${currentPath}': No such file or directory`,
          type: "error",
        },
      ],
    }
  }

  const formatted = contents
    .map((item) => `drwxr-xr-x  2 user user  4096 Mar 15 10:30 ${item}/`)
    .join("\n")

  return {
    output: [
      { content: `total ${contents.length * 4}`, type: "output" },
      { content: formatted, type: "output" },
    ],
  }
}

function handleCd(target: string | undefined, currentPath: string): CommandResult {
  if (!target || target === "~") {
    return {
      output: [],
      newPath: "~",
    }
  }

  if (target === "..") {
    if (currentPath === "~") {
      return { output: [] }
    }
    const parts = currentPath.split("/")
    parts.pop()
    const newPath = parts.length === 1 ? "~" : parts.join("/")
    return { output: [], newPath }
  }

  const fullPath = currentPath === "~" ? `~/${target}` : `${currentPath}/${target}`

  if (DIRECTORIES[fullPath as keyof typeof DIRECTORIES]) {
    return { output: [], newPath: fullPath }
  }

  const currentContents = DIRECTORIES[currentPath as keyof typeof DIRECTORIES]
  if (currentContents?.includes(target)) {
    return { output: [], newPath: fullPath }
  }

  return {
    output: [
      {
        content: `bash: cd: ${target}: No such file or directory`,
        type: "error",
      },
    ],
  }
}

function handleSudo(args: string[]): CommandResult {
  const subCommand = args[0]

  switch (subCommand) {
    case "github":
      return {
        output: [
          { content: "Opening GitHub repositories...", type: "success" },
        ],
        openModal: "github",
      }

    case "cv":
      return {
        output: [{ content: "Opening CV viewer...", type: "success" }],
        openModal: "cv",
      }

    case "skills":
      return {
        output: [
          { content: "Loading skills proficiency chart...", type: "success" },
        ],
        openModal: "skills",
      }

    case "mail":
      return {
        output: [{ content: "Opening contact form...", type: "success" }],
        openModal: "mail",
      }

    case "themes":
      const themeArg = args[1]
      if (!themeArg || !themeArg.startsWith("--")) {
        return {
          output: [
            {
              content:
                "Usage: sudo themes --[theme]\nAvailable themes: --matrix, --dracula, --ubuntu, --retro",
              type: "error",
            },
          ],
        }
      }

      const themeName = themeArg.replace("--", "") as
        | "matrix"
        | "dracula"
        | "ubuntu"
        | "retro"
      const validThemes = ["matrix", "dracula", "ubuntu", "retro"]

      if (!validThemes.includes(themeName)) {
        return {
          output: [
            {
              content: `Unknown theme: ${themeName}\nAvailable themes: --matrix, --dracula, --ubuntu, --retro`,
              type: "error",
            },
          ],
        }
      }

      return {
        output: [
          {
            content: `Theme changed to ${themeName}. UI updating...`,
            type: "success",
          },
        ],
        setTheme: themeName,
      }

    default:
      return {
        output: [
          {
            content: `sudo: ${subCommand || "(no command)"}: command not found\nTry: sudo github, sudo cv, sudo skills, sudo mail, sudo themes --[name]`,
            type: "error",
          },
        ],
      }
  }
}
