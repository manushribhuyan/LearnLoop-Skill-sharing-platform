"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { ChatInterface } from "@/components/chat-interface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Conversation {
  id: string
  otherUserName: string
  otherUserRole: "teacher" | "learner"
  lastMessage: string
  lastMessageTime: string
  unread: number
  avatar?: string
}

export default function MessagesPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      otherUserName: "Vaani Badra",
      otherUserRole: "teacher",
      lastMessage: "Thanks for the update! Looking forward to the next session.",
      lastMessageTime: "2 min ago",
      unread: 0,
    },
    {
      id: "2",
      otherUserName: "Sarah Chen",
      otherUserRole: "teacher",
      lastMessage: "Can we reschedule our session to next Tuesday?",
      lastMessageTime: "1 hour ago",
      unread: 1,
    },
    {
      id: "3",
      otherUserName: "Marcus Johnson",
      otherUserRole: "learner",
      lastMessage: "I'm interested in learning UI/UX design from you",
      lastMessageTime: "3 hours ago",
      unread: 0,
    },
    {
      id: "4",
      otherUserName: "Emma Rodriguez",
      otherUserRole: "teacher",
      lastMessage: "Great progress on your Spanish! Keep practicing.",
      lastMessageTime: "Yesterday",
      unread: 0,
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const filteredConversations = conversations.filter((conv) =>
    conv.otherUserName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                    selectedConversation?.id === conversation.id ? "bg-indigo-50 border-l-4 border-l-indigo-600" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">{conversation.otherUserName}</h3>
                        {conversation.unread > 0 && (
                          <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    <p className="text-xs text-gray-500 ml-2 whitespace-nowrap">{conversation.lastMessageTime}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">New Message</Button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <ChatInterface
                conversationId={selectedConversation.id}
                otherUserName={selectedConversation.otherUserName}
                otherUserRole={selectedConversation.otherUserRole}
                currentUserName={user.name}
              />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 h-full flex items-center justify-center">
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>

        {/* Session Details & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upcoming Session</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Advanced Calculus - Integration</span>
                <span className="font-medium text-indigo-600">Tomorrow, Dec 15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">3:00 PM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">60 minutes</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Reschedule
                </Button>
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">Join Session</Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                📅 Schedule Session
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                📎 Share Files
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                ⭐ Leave Review
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                🚩 Report User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
