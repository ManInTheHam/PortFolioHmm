"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Github } from "lucide-react"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Simulate loading with progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval)
          setTimeout(() => setIsLoading(false), 200) // Short delay after reaching 100%
          return 100
        }
        return prev + Math.floor(Math.random() * 8) + 3 // Random increment between 3-10%
      })
    }, 150)

    return () => clearInterval(loadingInterval)
  }, [])

  const projects = [
    {
      id: 1,
      title: "PrescriptionOCR",
      description: "A smart web app that reads handwritten prescriptions using OCR and ML to digitize medical records.",
      tags: ["Python", "Next.js", "ML", "AI", "OCR"]
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
        <div className="nfs-classic-loading">
          <div className="nfs-loading-text">LOADING PROJECTS...</div>
          <div className="nfs-progress-container">
            <div className="nfs-progress-bar" style={{ width: `${loadingProgress}%` }}></div>
          </div>
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
            <span className="text-white-500">PRO</span>JECTS
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
              <div className="flex justify-between items-start mb-2 md:mb-3">
                <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-white">{project.title}</h2>
                <Link
                  href={"https://github.com/ManInTheHam"} 
                  target="_blank"
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-5 w-5" />
                </Link>
              </div>
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
