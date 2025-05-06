"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Mail, FileText, User, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFlipped, setIsFlipped] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setMounted(true)
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Longer loading time to see the Pacman animation

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Calculate 3D rotation effect based on mouse position
  const calculateRotation = () => {
    if (!cardRef.current || isMobile) return { x: 0, y: 0 }

    const card = cardRef.current.getBoundingClientRect()
    const cardCenterX = card.left + card.width / 2
    const cardCenterY = card.top + card.height / 2

    // Calculate rotation (limited to a small range for subtle effect)
    const rotateY = ((mousePosition.x - cardCenterX) / card.width) * 10
    const rotateX = ((cardCenterY - mousePosition.y) / card.height) * 10

    return { x: rotateX, y: rotateY }
  }

  const rotation = calculateRotation()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
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
          <p className="text-lg font-light tracking-wider text-white">
            <span className="animate-pulse">LOADING</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black p-4 overflow-hidden">
      {/* Theme toggle button */}
      {mounted && (
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full border border-white/20 bg-black/50 backdrop-blur-sm hover:bg-white/10"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
          </Button>
        </motion.div>
      )}

      <div className="z-10 flex flex-col items-center">
        {/* Business Card - Responsive size */}
        <div
          ref={cardRef}
          className={`relative ${isMobile ? "h-[220px] w-[320px]" : "h-[260px] w-[480px]"} cursor-pointer perspective-1000`}
          onClick={handleFlip}
        >
          <AnimatePresence initial={false} mode="wait">
            {!isFlipped ? (
              <motion.div
                key="front"
                className="absolute h-full w-full rounded-xl bg-black p-6 md:p-8 shadow-xl"
                initial={{ rotateY: 180 }}
                animate={{
                  rotateY: 0,
                  rotateX: rotation.x,
                  y: rotation.y,
                }}
                exit={{ rotateY: -180 }}
                transition={{
                  duration: isFlipped ? 0.6 : 0.1,
                  ease: isFlipped ? "easeInOut" : "linear",
                }}
                style={{
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex h-full flex-col items-start justify-between">
                  <div className="flex w-full justify-between">
                    <div className="h-20 w-20 rounded-full bg-background/90 flex items-center justify-center overflow-hidden">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center overflow-hidden">
                        <Image
                          src="/image/i.jpg"
                          alt="Profile"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-right text-xs md:text-sm font-light tracking-widest text-white/80">
                        INTERACTIVE
                      </p>
                      <p className="text-right text-xs md:text-sm font-light tracking-widest text-white">
                        CLICK TO FLIP
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className="mb-1 text-2xl md:text-4xl font-bold text-white">SOHAM JOSHI</h2>
                    <p className="text-lg md:text-xl font-light tracking-wider text-white/90">.engineer</p>
                  </div>
                  <p className="text-xs md:text-sm font-light tracking-widest text-white/70">
                    <span className="text-white/80">Hmm</span> 
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                className="absolute h-full w-full rounded-xl bg-zinc-900 p-6 md:p-8 shadow-xl"
                initial={{ rotateY: -180 }}
                animate={{
                  rotateY: 0,
                  rotateX: rotation.x,
                  y: rotation.y,
                }}
                exit={{ rotateY: 180 }}
                transition={{
                  duration: isFlipped ? 0.1 : 0.6,
                  ease: isFlipped ? "linear" : "easeInOut",
                }}
                style={{
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h2 className="mb-1 text-xl md:text-3xl font-bold text-white">SOHAM JOSHI</h2>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2 md:gap-3">
                      <Link
                        href="/projects"
                        className="group flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                      >
                        <FileText className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110" />
                        <span className="text-sm md:text-base">PROJECTS</span>
                      </Link>
                      <Link
                        href="/blogs"
                        className="group flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                      >
                        <FileText className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110" />
                        <span className="text-sm md:text-base">BLOGS</span>
                      </Link>
                      <Link
                        href="/skills"
                        className="group flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                      >
                        <User className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110" />
                        <span className="text-sm md:text-base">SKILLS / CV</span>
                      </Link>
                      <Link
                        href="/contact"
                        className="group flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                      >
                        <Mail className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110" />
                        <span className="text-sm md:text-base">CONTACT</span>
                      </Link>
                    </div>

                    <div className="flex flex-col items-end justify-end">
                      <Link
                        href="https://github.com/ManInTheHam"
                        target="_blank"
                        className="group flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                      >
                        <Github className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110" />
                      </Link>
                      <p className="mt-2 text-xs md:text-sm text-white/60">joshi.soham27@gmail.com</p>
                      <p className="text-xs md:text-sm text-white/60">+91 7719088844</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p
          className="mt-6 md:mt-8 text-center text-xs md:text-sm font-light text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Click the card to flip and access navigation
        </motion.p>
      </div>
    </main>
  )
}
