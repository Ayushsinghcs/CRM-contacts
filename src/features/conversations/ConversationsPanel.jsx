import React, { useState } from "react";

export default function ConversationsPanel({ items = [] }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleReply = (conversationId) => {
    if (replyText.trim()) {
      // Here you would typically send the reply to your backend
      console.log(`Replying to conversation ${conversationId}:`, replyText);
      setReplyText("");
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
      // You could also update the conversations state here
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="pl-12 pr-4 px-6 py-3 border-b bg-white">
        <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-800">
          💬 <span>Conversations</span>
          <button className="hover:text-gray-700 transition-colors flex items-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 bg-white">
        {items.map(conv => (
          <ConversationCard 
            key={conv.id} 
            conv={conv} 
            onReply={handleReply}
            replyText={replyText}
            setReplyText={setReplyText}
            isSelected={selectedConversation === conv.id}
            onSelect={() => setSelectedConversation(conv.id)}
          />
        ))}
      </div>
      
      {/* Sticky input area */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200">
        {/* Typing indicator */}
        
          <div className="px-4 py-2 bg-white border-b">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs">📞</span>
              </div>
              <span>Olivia is typing</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
    
        
        <div className="p-3 sm:p-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          {/* Envelope dropdown button */}
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Message input */}
          <input
            type="text"
            placeholder="Type your message..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500"
          />

          {/* Sparkles button */}
          <button className="text-purple-600 hover:text-purple-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </button>

          {/* Send button */}
          <button 
            onClick={() => handleReply(selectedConversation)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

function ConversationCard({ conv, onReply, replyText, setReplyText, isSelected, onSelect }) {
  const [isReplying, setIsReplying] = useState(false);
  const [localReplyText, setLocalReplyText] = useState("");

  const handleReplyClick = () => {
    setIsReplying(true);
    onSelect();
  };

  const handleSendReply = () => {
    if (localReplyText.trim()) {
      onReply(conv.id);
      setLocalReplyText("");
      setIsReplying(false);
    }
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setLocalReplyText("");
  };

  return (
    <div className="space-y-3">
      {/* Main conversation card */}
      <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
        {/* Subject + expand button */}
        <div className="flex justify-between items-start mb-2 pb-2 border-b border-gray-100">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex-1 pr-2">
            {conv.subject}
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 text-2xl"
            title="Expand"
          >
            ⤢
          </button>
        </div>

        {/* Sender → recipient + action buttons */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs sm:text-sm text-gray-500 truncate flex-1 pr-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img 
                  src="https://i.pravatar.cc/100" 
                  alt="Olivia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-gray-700">Olivia John</div>
                <div className="text-xs text-gray-500">To: me</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-gray-500 text-sm flex-shrink-0">
            <span className="text-xs text-gray-700">{conv.time}</span>
            <button className="hover:text-amber-600 transition-colors text-amber-700" title="Star">⭐</button>
            <button className="hover:text-blue-600 transition-colors text-gray-600  rounded px-1 py-0.5 text-xs" title="Back">←</button>
            <button className="hover:text-blue-600 transition-colors" title="More">⋮</button>
          </div>
        </div>

        {/* Message */}
        <p className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
          {conv.message}
        </p>

        {/* Track link */}
        {conv.trackLink && (
          <a
            href={conv.trackLink}
            className="mt-2 inline-block text-sm text-blue-600 hover:underline transition-colors"
          >
            Track your order
          </a>
        )}

        {/* Reply section */}
        {isReplying ? (
          <div className="mt-3 space-y-2">
            <textarea
              value={localReplyText}
              onChange={(e) => setLocalReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows="3"
            />
            <div className="flex gap-2">
              <button 
                onClick={handleSendReply}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm text-sm transition-colors flex items-center gap-1"
              >
                <span>←</span> Reply
              </button>
              <button 
                onClick={handleCancelReply}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <button 
              onClick={handleReplyClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm text-sm transition-colors w-full sm:w-auto flex items-center justify-center gap-1"
            >
              <span>←</span> Reply
            </button>
          </div>
        )}
      </div>

      {/* Reply display - outside the main card */}
      {conv.reply && (
        <div className="flex items-start gap-3 ml-4">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-gray-600">O</span>
          </div>
          
          {/* Reply content */}
          <div className="w-40 bg-gray-100 rounded-lg p-2">
            <div className="text-xs font-medium text-gray-700 mb-1">Olivia</div>
            <p className="text-xs text-gray-600">{conv.reply}</p>
            <div className="text-xs text-gray-400 mt-1">11:44 AM</div>
          </div>
        </div>
      )}
    </div>
  );
}
