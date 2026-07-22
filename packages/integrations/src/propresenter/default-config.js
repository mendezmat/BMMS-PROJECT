export const defaultProPresenterConfig = Object.freeze({
  enabled: false,
  host: "127.0.0.1",
  port: 1025,
  protocol: "auto",
  autoConnect: false,
  reconnect: {
    enabled: true,
    delayMs: 3000,
    maxDelayMs: 30000
  },
  monitoring: {
    presentations: true,
    text: true,
    media: true
  }
});
