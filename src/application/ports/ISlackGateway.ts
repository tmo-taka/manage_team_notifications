export interface ISlackGateway {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fetchConversationsHistory(): Promise<any[]>;
}
