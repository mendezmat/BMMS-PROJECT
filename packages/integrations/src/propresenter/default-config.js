export const defaultProPresenterConfig = Object.freeze({
  enabled: false,
  host: "127.0.0.1",
  port: 1025,
  protocol: "tcp",
  autoConnect: false,
  connectTimeoutMs: 3000,
  requestTimeoutMs: 3000,
  reconnect: {
    enabled: true,
    initialDelayMs: 1000,
    maxDelayMs: 30000,
    multiplier: 1.8
  },
  monitoring: {
    presentations: true,
    text: true,
    media: true,
    subscriptions: []
  }
});
