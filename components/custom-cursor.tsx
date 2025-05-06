"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverOn = () => setLinkHovered(true)
    const handleLinkHoverOff = () => setLinkHovered(false)

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    // Add event listeners to all links and buttons
    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverOn)
      link.addEventListener("mouseleave", handleLinkHoverOff)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverOn)
        link.removeEventListener("mouseleave", handleLinkHoverOff)
      })
    }
  }, [])

  // Add event listeners when new links are added to the DOM
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const links = document.querySelectorAll("a, button")
          links.forEach((link) => {
            link.addEventListener("mouseenter", () => setLinkHovered(true))
            link.addEventListener("mouseleave", () => setLinkHovered(false))
          })
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  const variants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      height: 28,
      width: 28,
    },
    link: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      borderWidth: "2px",
      backgroundColor: "rgba(249, 115, 22, 0)",
    },
    hidden: {
      opacity: 0,
    },
  }

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center rounded-full border border-orange-500/50 bg-orange-500/20 backdrop-blur-sm"
        variants={variants}
        animate={hidden ? "hidden" : clicked ? "clicked" : linkHovered ? "link" : "default"}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {linkHovered && <div className="h-1 w-1 rounded-full bg-orange-500"></div>}
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 rounded-full bg-orange-500"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
      />
    </>
  )
}
