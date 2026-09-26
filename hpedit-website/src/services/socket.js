import { useEffect } from 'react';
import { io } from 'socket.io-client';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function useSocket(onEvent) {
  useEffect(() => {
    const socket = io(API_URL);
    if (onEvent) {
      for (const [event, handler] of Object.entries(onEvent)) {
        socket.on(event, handler);
      }
    }
    return () => {
      socket.disconnect();
    };
  }, [onEvent]);
}
