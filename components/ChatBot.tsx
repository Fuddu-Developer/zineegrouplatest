'use client'

import { getChatbotVersion } from './chatbot-config'
import ChatBotLegacy from './ChatBotLegacy'
import LoanChatBot from './LoanChatBot'

export interface ChatBotProps {
  showWhatsApp?: boolean
  showChatToggle?: boolean
  showLabel?: boolean
  embedded?: boolean
  onClose?: () => void
}

/**
 * Renders the selected chatbot (new LoanChatBot or legacy).
 * Switch via env: NEXT_PUBLIC_CHATBOT_VERSION=legacy | new
 * Default: new
 */
export default function ChatBot(props: ChatBotProps) {
  const version = getChatbotVersion()

  if (version === 'legacy') {
    return <ChatBotLegacy {...props} />
  }

  return <LoanChatBot {...props} />
}
