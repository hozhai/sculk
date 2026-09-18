type ReactableMessage = {
  react: (emoji: string) => Promise<unknown>;
};

const pendingMessages: ReactableMessage[] = [];

export function addPendingMessage(message: ReactableMessage) {
  pendingMessages.push(message);
}

export function reactToPendingMessage(emoji: string) {
  const message = pendingMessages.shift();
  if (message) {
    void message.react(emoji);
  }
}

export function removePendingMessage() {
  pendingMessages.shift();
}
