/**
 * Which chatbot to use site-wide.
 * - 'new'   = LoanChatBot (deeper flows, themed UI)
 * - 'legacy' = ChatBotLegacy (original preset options)
 *
 * Set in .env.local: NEXT_PUBLIC_CHATBOT_VERSION=legacy  or  new
 * Default: new
 */
export type ChatbotVersion = 'new' | 'legacy'

export function getChatbotVersion(): ChatbotVersion {
  const v =
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_CHATBOT_VERSION) || 'new'
  return (v.toLowerCase() === 'legacy' ? 'legacy' : 'new') as ChatbotVersion
}
