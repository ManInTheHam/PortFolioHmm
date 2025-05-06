"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Skills() {
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const skills = [
    { name: "Python", level: 90 },
    { name: "Flask", level: 80 },
    { name: "Django", level: 70 },
    { name: "SQL", level: 80 },
    { name: "NoSQL", level: 70 },
    { name: "Shell Scripting", level: 60 },
    { name: "FastAPI", level: 70 },
    { name: "JavaScript", level: 40 },
    { name: "Golang", level: 10 },
    { name: "Node.js", level: 40 },
    { name: "Next.js", level: 30 },
    { name: "UI/UX Design", level: 65 },
  ]

  const education = [
    {
      degree: "Bachelor of Engineering in Electronics",
      institution: "International Institute of Information Technology, Pune",
      year: "2025",
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
          <p className="text-lg font-light tracking-wider text-white">LOADING SKILLS</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black p-4 md:p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
          <Link href="/" className="group flex items-center gap-2 text-white transition-colors hover:text-gray-300">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Card</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider md:ml-auto">SKILLS & RESUME</h1>
          {!isMobile && (
            <Button variant="outline" className="md:ml-6 border-white text-white hover:bg-white/10" asChild>
              <Link href="/image/SCJ_CV.pdf" target="_blank" download>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Link>
            </Button>
          )}
        </div>

        {isMobile && (
          <div className="mb-6 flex justify-end">
            <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/resume.pdf" target="_blank" download>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Link>
            </Button>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6">Technical Skills</h2>

          <motion.div
            className="grid gap-y-6 gap-x-8 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
                whileHover={{ scale: 1.01 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-xl md:text-2xl font-bold mb-6">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="rounded-lg border border-zinc-800 bg-zinc-900/20 p-4 backdrop-blur-sm"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <div className="flex flex-col md:flex-row md:items-center justify-between text-sm mt-1">
                  <span className="text-gray-300">{edu.institution}</span>
                  <span className="text-white mt-1 md:mt-0">{edu.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
