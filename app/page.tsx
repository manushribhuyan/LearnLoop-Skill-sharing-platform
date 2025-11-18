import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { AnimatedCharacter } from "@/components/animated-character"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Learn. Teach.
              <span className="block text-indigo-600">Grow Together.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect with skilled professionals and passionate learners. Share your expertise, learn new skills, and
              build meaningful relationships in our trusted community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6">
                  Get Started Today
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-96 flex items-center justify-center">
            <AnimatedCharacter />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600">100+</div>
            <p className="text-gray-600 mt-2">Active Teachers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600">50+</div>
            <p className="text-gray-600 mt-2">Skills Available</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600">500+</div>
            <p className="text-gray-600 mt-2">Learning Sessions</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Sign Up",
                description: "Create your account and choose your role as a teacher, learner, or both.",
              },
              {
                step: 2,
                title: "Build Profile",
                description: "Add your skills, expertise, or learning goals to your profile.",
              },
              {
                step: 3,
                title: "Connect",
                description: "Browse and connect with teachers or learners that match your interests.",
              },
              {
                step: 4,
                title: "Learn",
                description: "Schedule sessions, communicate, and start your learning journey.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built on Trust & Safety</h2>
            <p className="text-xl text-gray-600">We prioritize your security and community integrity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✓",
                title: "Verified Profiles",
                description: "All users are verified to ensure a safe and trustworthy community.",
              },
              {
                icon: "⭐",
                title: "5-Star Ratings",
                description: "Transparent ratings and reviews help you make informed decisions.",
              },
              {
                icon: "🛡️",
                title: "Safe Transactions",
                description: "Secure messaging and booking system with built-in protections.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how our community is learning and growing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Learner",
                story: "I learned React from an amazing teacher and landed my first dev job!",
                rating: 5,
              },
              {
                name: "Marcus Johnson",
                role: "Teacher",
                story: "Teaching on LearnHub has been incredibly rewarding. Great community!",
                rating: 5,
              },
              {
                name: "Emma Rodriguez",
                role: "Both",
                story: "I teach Spanish and learn web design. Best platform for skill exchange!",
                rating: 5,
              },
            ].map((story, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{story.story}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{story.name}</p>
                  <p className="text-sm text-gray-600">{story.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">Join thousands of learners and teachers in our community</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=learner">
              <Button className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6">
                Start Learning
              </Button>
            </Link>
            <Link href="/signup?role=teacher">
              <Button className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-400 text-white text-lg px-8 py-6">
                Start Teaching
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <span className="font-bold text-white">LearnHub</span>
              </div>
              <p className="text-sm">Learn. Teach. Grow Together.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Browse Teachers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Browse Learners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Report Issue
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
