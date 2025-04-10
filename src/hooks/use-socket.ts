import { WebSocketMessage } from "@/types/general";
import { useEffect, useRef, useState } from "react";


interface UseSocketReturn {
    isConnected: boolean;
    messages: WebSocketMessage[];
    sendMessage: (message: string) => void;
    closeSocket: () => void;
}

const useSocket = ( url : string): UseSocketReturn => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [messages, setMessages] = useState<WebSocketMessage[]>([]);

    useEffect(() => {
        if (!url) return;
        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
        };

        socketRef.current.onmessage = (event) => {
            const parsedData = typeof event.data === 'string' 
                ? JSON.parse(event.data) 
                : event.data;
            
            setMessages((prev) => [...prev, parsedData]);
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket disconnected");
            setIsConnected(false);
        };

        return () => {
            socketRef.current?.close();
        };
    }, [url]);

    const sendMessage = (message: string): void => {
        if (socketRef.current && isConnected) {
            socketRef.current.send(message);
        } else {
            console.error("WebSocket is not connected");
        }
    };

    return { isConnected, messages, sendMessage, closeSocket: () => socketRef.current?.close() };
};

export default useSocket;
