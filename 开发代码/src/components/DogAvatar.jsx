import React from 'react';

function DogAvatar({ isSpeaking }) {
  return (
    <div style={{
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      backgroundColor: '#2196F3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '40px',
      boxShadow: isSpeaking ? '0 0 30px rgba(33, 150, 243, 0.8)' : '0 0 10px rgba(33, 150, 243, 0.5)',
      transition: 'box-shadow 0.3s ease'
    }}>
      <div style={{
        width: '200px',
        height: '200px',
        backgroundColor: '#FFFFFF',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '120px'
      }}>
        🐶
      </div>
    </div>
  );
}

export default DogAvatar;
