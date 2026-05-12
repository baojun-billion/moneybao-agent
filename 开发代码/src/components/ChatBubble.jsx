import React from 'react';

function ChatBubble({ role, content }) {
  const isUser = role === 'user';

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '20px'
    }}>
      <div style={{
        maxWidth: '70%',
        padding: '15px 20px',
        borderRadius: '20px',
        backgroundColor: isUser ? '#2196F3' : '#333333',
        color: '#FFFFFF',
        wordBreak: 'break-word',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
      }}>
        {content}
      </div>
    </div>
  );
}

export default ChatBubble;
