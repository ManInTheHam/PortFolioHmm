"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Send, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formState)
    // Reset form
    setFormState({ name: "", email: "", message: "" })
    // Show success message or redirect
  }

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
          <p className="text-lg font-light tracking-wider text-white">LOADING CONTACT</p>
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
            <span className="text-white">CON</span>TACT
          </h1>
        </div>

        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold">Get in Touch</h2>
            <p className="mb-6 text-sm md:text-base text-white/80">
              Im always open to new opportunities, collaborations, or just a friendly chat about technology and design.
            </p>

            <div className="space-y-4">
              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-white" />
                <span className="text-sm md:text-base">joshi.soham27@gmail.com</span>
              </motion.div>
              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <Github className="h-4 w-4 md:h-5 md:w-5 text-white" />
                <a
                  href="https://github.com/ManInTheHam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base hover:text-white"
                >
                  github.com/ManInTheHam
                </a>
              </motion.div>
              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-white" />
                <a
                  href="https://www.linkedin.com/in/soham-joshi-54aa171aa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base hover:text-white"
                >
                  linkedin.com/in/SohamJoshi
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 md:mb-2 block text-xs md:text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="border-zinc-800 bg-zinc-900/20 text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 md:mb-2 block text-xs md:text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="border-zinc-800 bg-zinc-900/20 text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 md:mb-2 block text-xs md:text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={isMobile ? 4 : 5}
                  className="border-zinc-800 bg-zinc-900/20 text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                <Send className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
