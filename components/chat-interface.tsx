"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  sender: string
  senderRole: "teacher" | "learner"
  content: string
  timestamp: Date
  isOwn: boolean
}

interface ChatInterfaceProps {
  conversationId: string
  otherUserName: string
  otherUserRole: "teacher" | "learner"
  currentUserName: string
}

export function ChatInterface({ conversationId, otherUserName, otherUserRole, currentUserName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: otherUserName,
      senderRole: otherUserRole,
      content: "Hi! I wanted to follow up on today's calculus lesson.",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
    {
      id: "2",
      sender: currentUserName,
      senderRole: "teacher",
      content: "Of course! How did you find the integration problems?",
      timestamp: new Date(Date.now() - 3300000),
      isOwn: true,
    },
    {
      id: "3",
      sender: otherUserName,
      senderRole: otherUserRole,
      content:
        "They were challenging but I understood the substitution method now. Could we go over the practice problems next session?",
      timestamp: new Date(Date.now() - 3000000),
      isOwn: false,
    },
    {
      id: "4",
      sender: currentUserName,
      senderRole: "teacher",
      content: "That's a great idea. I'll prepare some additional examples for you.",
      timestamp: new Date(Date.now() - 2700000),
      isOwn: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setIsLoading(true)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: currentUserName,
      senderRole: "teacher",
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate response
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: otherUserName,
        senderRole: otherUserRole,
        content: "Thanks for the update! Looking forward to the next session.",
        timestamp: new Date(),
        isOwn: false,
      }
      setMessages((prev) => [...prev, responseMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{otherUserName}</h3>
          <p className="text-sm text-gray-600 capitalize">{otherUserRole}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="bg-transparent">
            📞 Call
          </Button>
          <Button size="sm" variant="outline" className="bg-transparent">
            📹 Video
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isOwn ? "bg-indigo-600 text-white rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${message.isOwn ? "text-indigo-200" : "text-gray-600"}`}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !newMessage.trim()} className="bg-indigo-600 hover:bg-indigo-700">
          {isLoading ? "..." : "Send"}
        </Button>
      </form>
    </div>
  )
}
