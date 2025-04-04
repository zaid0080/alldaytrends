'use client'

import { useState } from 'react'
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi'

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, feedback })
      })
  
      if (!response.ok) throw new Error('Submission failed')
      setIsSubmitted(true)
      setName('')
      setEmail('')
      setFeedback('')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-40"
        aria-label="Provide feedback"
      >
        <FiMessageSquare size={24} />
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setIsOpen(false)
                setIsSubmitted(false)
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FiX size={20} />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your feedback has been submitted successfully.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Share Your Feedback
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder='Enter your name'
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        placeholder='Enter your email'
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Feedback
                      </label>
                      <textarea
                        id="feedback"
                        placeholder='Enter your feedback'
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200 disabled:opacity-70"
                    >
                      {isSubmitting ? 'Submitting...' : (
                        <>
                          <FiSend className="mr-2" />
                          Submit Feedback
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}