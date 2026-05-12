/**
 * Web Speech API - 语音识别工具
 * 浏览器原生支持，完全免费
 */

export class SpeechRecognition {
  constructor() {
    // 检查浏览器支持
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      this.recognition.lang = 'zh-CN';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    } else {
      console.error('浏览器不支持语音识别');
      this.recognition = null;
    }
  }

  /**
   * 开始识别
   * @returns {Promise<string>} 识别到的文本
   */
  async start() {
    if (!this.recognition) {
      throw new Error('浏览器不支持语音识别');
    }

    return new Promise((resolve, reject) => {
      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        resolve(text);
      };

      this.recognition.onerror = (event) => {
        console.error('语音识别错误:', event.error);
        reject(new Error(`语音识别失败: ${event.error}`));
      };

      this.recognition.onend = () => {
        // 识别结束
      };

      this.recognition.start();
    });
  }

  /**
   * 停止识别
   */
  stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

/**
 * Web Speech API - 语音合成工具
 * 浏览器原生支持，完全免费
 */

export class SpeechSynthesis {
  constructor() {
    if ('speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    } else {
      console.error('浏览器不支持语音合成');
      this.synth = null;
    }
  }

  /**
   * 朗读文本
   * @param {string} text - 要朗读的文本
   * @returns {Promise<void>}
   */
  async speak(text) {
    if (!this.synth) {
      throw new Error('浏览器不支持语音合成');
    }

    return new Promise((resolve, reject) => {
      // 停止当前正在播放的语音
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 1.0; // 语速
      utterance.pitch = 1.0; // 音高
      utterance.volume = 1.0; // 音量

      // 尝试选择中文语音
      const voices = this.synth.getVoices();
      const chineseVoice = voices.find(voice => voice.lang.includes('zh'));
      if (chineseVoice) {
        utterance.voice = chineseVoice;
      }

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('语音合成错误:', event.error);
        reject(new Error(`语音合成失败: ${event.error}`));
      };

      this.synth.speak(utterance);
    });
  }

  /**
   * 停止朗读
   */
  cancel() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

// 导出单例
export const recognition = new SpeechRecognition();
export const synthesis = new SpeechSynthesis();
