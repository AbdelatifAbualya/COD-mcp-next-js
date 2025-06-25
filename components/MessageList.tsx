'use client';

import { ChatMessage as MessageType } from '@/types';
import Message from './Message';

interface MessageListProps {
  messages: MessageType[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((msg) => (
        <Message key={msg.id} {...msg} />
      ))}
    </div>
  );
};

export default MessageList;
