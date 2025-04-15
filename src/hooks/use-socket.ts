import { useEffect, useState } from 'react';
import { WebSocketMessage } from '@/types/general';
import { socketManager } from '@/utils/socket_manager';


interface UseSocketReturn {
    isConnected: boolean;
    isConnecting: boolean;
    messages: WebSocketMessage[];
    sendMessage: (message: string) => void;
    closeSocket: () => void;
}

export const useSocket = (clientId: string, url: string): UseSocketReturn => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const [messages, setMessages] = useState<WebSocketMessage[]>([]);

    useEffect(() => {
        if (!clientId || !url) return;

        const handleStatusChange = (connected: boolean) => {
            setIsConnected(connected);
            setIsConnecting(false);
        };

        const handleMessage = (message: WebSocketMessage) => {
            setMessages(prev => [...prev, message]);
        };

        socketManager.addStatusListener(clientId, handleStatusChange);
        socketManager.addMessageListener(clientId, handleMessage);

        socketManager.connect(clientId, url);

        return () => {
            socketManager.removeStatusListener(clientId, handleStatusChange);
            socketManager.removeMessageListener(clientId, handleMessage);
        };
    }, [clientId, url]);

    const sendMessage = (message: string) => {
        socketManager.sendMessage(clientId, message);
    };

    const closeSocket = () => {
        socketManager.close(clientId);
    };

    return {
        isConnected,
        isConnecting,
        messages,
        sendMessage,
        closeSocket
    };
};