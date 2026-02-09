import axios from 'axios';

const token = import.meta.env.VITE_SLACK_BOT_TOKEN;
const channelId = import.meta.env.VITE_SLACK_CHANNEL_ID;

const slackClient = axios.create({
  baseURL: 'https://slack.com/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  params: {
    channel: channelId,
  },
});

export const fetchConversationsHistory = async () => {
  const response = await slackClient.get('/conversations.history');
  return response.data;
};

// リクエストインターセプター
slackClient.interceptors.request.use(
  (config) => {
    // リクエスト前の処理（例：ログ、トークン付与）
    console.log(
      `[Request Slack] ${config.method?.toUpperCase()} ${config.url}`,
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// レスポンスインターセプター
slackClient.interceptors.response.use(
  (response) => {
    // 成功時の処理
    return response;
  },
  (error) => {
    // エラー時の共通処理
    console.error('[Slack API Error]', error.response?.status, error.message);
    return Promise.reject(error);
  },
);
