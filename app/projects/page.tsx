"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const projects = [
    {
      id: 1,
      title: "MediOcracy",
      description: "A smart web app that reads handwritten prescriptions using OCR and ML to digitize medical records.",
      tags: ["Python", "Flask", "ML", "AI", "OCR"]
    },
    
    {
      id: 2,
      title: "Packet Sniffer",
      description: "A network packet sniffer that captures and analyzes network traffic in real-time.",
      tags: ["Wireshark", "Python", "Network"],
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with advanced features",
      tags: ["Next.js", "Stripe", "Tailwind CSS", "MongoDB"],
    },
  ]

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-6">
          <div className="pacman-container">
            <div className="pacman">
              <div className="pacman-top"></div>
              <div className="pacman-bottom"></div>
            </div>
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          <p className="text-lg font-light tracking-wider text-white">LOADING PROJECTS</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black p-4 md:p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 md:mb-12 flex items-center">
          <Link href="/" className="group flex items-center gap-2 text-white transition-colors hover:text-gray-300">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Card</span>
          </Link>
          <h1 className="ml-auto text-2xl md:text-3xl font-bold tracking-wider">
            <span className="text-white">PRO</span>JECTS
          </h1>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/20 p-4 md:p-6 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-zinc-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: isMobile ? 1.01 : 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="mb-2 md:mb-3 text-lg md:text-xl font-bold text-white group-hover:text-white">
                {project.title}
              </h2>
              <p className="mb-3 md:mb-4 text-sm md:text-base text-white/70">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
