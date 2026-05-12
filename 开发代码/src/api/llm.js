import axios from 'axios';

/**
 * MiniMax-M2.5 API
 */

const MINIMAX_API_KEY = import.meta.env.VITE_MINIMAX_API_KEY || '';
const MINIMAX_API_URL = 'https://api.minimax.chat/v1/text/chatcompletion_v2';

export async function chatWithMiniMax(messages) {
  try {
    console.log('调用 MiniMax API...');

    const response = await axios.post(
      MINIMAX_API_URL,
      {
        model: 'abab6.5s-chat',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MINIMAX_API_KEY}`
        }
      }
    );

    console.log('MiniMax API 响应:', response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('MiniMax API 调用失败:', error);
    throw error;
  }
}

/**
 * GLM-4.7 API（智谱 AI）
 */

const ZAI_API_KEY = import.meta.env.VITE_ZAI_API_KEY || '';
const ZAI_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

export async function chatWithGLM4(messages) {
  try {
    console.log('调用 GLM-4 API...');

    const response = await axios.post(
      ZAI_API_URL,
      {
        model: 'glm-4',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ZAI_API_KEY}`
        }
      }
    );

    console.log('GLM-4 API 响应:', response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('GLM-4 API 调用失败:', error);
    throw error;
  }
}

/**
 * 统一接口
 */

const LLM_MODEL = import.meta.env.VITE_LLM_MODEL || 'minimax-m2.5';

console.log('当前使用的 LLM 模型:', LLM_MODEL);

export async function chatWithAI(messages) {
  if (LLM_MODEL === 'glm-4.7') {
    return chatWithGLM4(messages);
  } else if (LLM_MODEL === 'minimax-m2.5') {
    return chatWithMiniMax(messages);
  } else {
    throw new Error(`不支持的模型: ${LLM_MODEL}`);
  }
}
