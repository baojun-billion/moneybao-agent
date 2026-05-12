import { useState, useRef, useEffect } from 'react';
import DogAvatar from './components/DogAvatar';
import ChatBubble from './components/ChatBubble';
import VoiceRecorder from './components/VoiceRecorder';
import { chatWithAI } from './api/llm';
import { recognition, synthesis } from './utils/speech';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是沃橙信息的智能前台，有什么可以帮你的吗？' }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 初始化语音合成（加载语音）
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // 预加载语音（解决首次播放延迟问题）
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleRecordStart = async () => {
    setIsRecording(true);
    try {
      const text = await recognition.start();
      console.log('识别到文本:', text);
      setIsRecording(false);
      setIsProcessing(true);

      try {
        // 1. AI 对话
        const response = await chatWithAI([
          {
            role: 'system',
            content: '你是沃橙信息的智能前台，形象是姜浩的狗头，亲切、专业、有趣。你的任务是回答访客的问题，提供企业信息，展示友好形象。'
          },
          ...messages,
          { role: 'user', content: text }
        ]);

        console.log('AI 回复:', response);
        const aiMessage = { role: 'assistant', content: response };

        // 2. 语音合成
        await synthesis.speak(response);

        // 3. 更新对话
        setMessages([...messages, { role: 'user', content: text }, aiMessage]);
      } catch (error) {
        console.error('处理失败:', error);
        setMessages([...messages, { role: 'assistant', content: '抱歉，我刚才没听清楚，能再说一遍吗？' }]);
      } finally {
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('录音失败:', error);
      setIsRecording(false);
      setIsProcessing(false);
      alert('语音识别失败，请检查麦克风权限');
    }
  };

  const handleRecordStop = () => {
    if (isRecording) {
      recognition.stop();
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000',
      color: '#FFFFFF',
      padding: '20px'
    }}>
      {/* 狗头形象 */}
      <DogAvatar isSpeaking={isRecording || isProcessing} />

      {/* 对话显示 */}
      <div style={{
        flex: 1,
        width: '100%',
        maxWidth: '800px',
        overflowY: 'auto',
        marginBottom: '20px'
      }}>
        {messages.map((message, index) => (
          <ChatBubble key={index} role={message.role} content={message.content} />
        ))}
      </div>

      {/* 录音按钮 */}
      <VoiceRecorder
        isRecording={isRecording}
        isProcessing={isProcessing}
        onRecordStart={handleRecordStart}
        onRecordStop={handleRecordStop}
      />
    </div>
  );
}

export default App;
