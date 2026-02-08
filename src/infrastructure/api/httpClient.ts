import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3001', // TODO: json-server
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
httpClient.interceptors.request.use(
  (config) => {
    // リクエスト前の処理（例：ログ、トークン付与）
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// レスポンスインターセプター
httpClient.interceptors.response.use(
  (response) => {
    // 成功時の処理
    return response;
  },
  (error) => {
    // エラー時の共通処理
    console.error('[API Error]', error.response?.status, error.message);
    return Promise.reject(error);
  },
);
