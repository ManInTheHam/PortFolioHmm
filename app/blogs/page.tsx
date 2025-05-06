"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Blogs() {
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const blogs = [
    {
      id: 1,
      title: "How I Started Learning Go (Golang): A Developer's Journey into Simplicity and Speed",
      date: "May 1, 2025",
      excerpt: "Exploring the Golang Programming Language.",
      link: "https://open.substack.com/pub/manintheham/p/how-i-started-learning-go-golang?r=5l6uyg&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false",
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
          <p className="text-lg font-light tracking-wider text-white">LOADING BLOGS</p>
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
            <span className="text-white">BLO</span>GS
          </h1>
        </div>

        <div className="space-y-6 md:space-y-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-4 md:p-6 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-zinc-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: isMobile ? 1.01 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="mb-2 text-xl md:text-2xl font-bold text-white hover:text-white">{blog.title}</h2>
              <div className="mb-3 md:mb-4 flex items-center gap-2 text-xs md:text-sm text-white/60">
                <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                <span>{blog.date}</span>
              </div>
              <p className="text-sm md:text-base text-white/80">{blog.excerpt}</p>
              <div className="mt-3 md:mt-4">
                <Link href="https://open.substack.com/pub/manintheham/p/how-i-started-learning-go-golang?r=5l6uyg&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false" className="text-white hover:text-gray-300">
                  Read more →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  )
}
