import React, { useState, useRef, useEffect } from 'react';

function VoiceRecorder({ isRecording, isProcessing, onRecordStart, onRecordStop }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px'
    }}>
      <button
        onClick={isRecording ? onRecordStop : onRecordStart}
        disabled={isProcessing}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: isRecording ? '#FF6B35' : (isProcessing ? '#666666' : '#4CAF50'),
          color: '#FFFFFF',
          fontSize: '48px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          transition: 'background-color 0.3s ease',
          opacity: isProcessing ? 0.6 : 1
        }}
      >
        {isProcessing ? '⏳' : (isRecording ? '⏹' : '🎙️')}
      </button>

      <div style={{ fontSize: '14px', color: '#AAAAAA' }}>
        {isProcessing ? '处理中...' : (isRecording ? '录音中...' : '点击开始录音')}
      </div>
    </div>
  );
}

export default VoiceRecorder;
