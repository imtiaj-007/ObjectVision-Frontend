import { WebSocketMessage } from "@/types/general";

class SocketManager {
    private static instance: SocketManager;
    private sockets: Map<string, WebSocket> = new Map();
    private messageListeners: Map<string, ((message: WebSocketMessage) => void)[]> = new Map();
    private statusListeners: Map<string, ((connected: boolean) => void)[]> = new Map();

    private constructor() { }

    public static getInstance(): SocketManager {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager();
        }
        return SocketManager.instance;
    }

    public connect(clientId: string, url: string): WebSocket {
        if (this.sockets.has(clientId)) {
            return this.sockets.get(clientId)!;
        }

        const socket = new WebSocket(url);
        this.sockets.set(clientId, socket);

        socket.onopen = () => {
            this.notifyStatusListeners(clientId, true);
        };

        socket.onmessage = (event) => {
            try {
                const message = typeof event.data === 'string'
                    ? JSON.parse(event.data)
                    : event.data;
                this.notifyMessageListeners(clientId, message);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            this.notifyStatusListeners(clientId, false);
        };

        socket.onclose = () => {
            this.notifyStatusListeners(clientId, false);
            this.cleanup(clientId);
        };

        return socket;
    }

    public sendMessage(clientId: string, message: string): void {
        const socket = this.sockets.get(clientId);
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(message);
        }
    }

    public close(clientId: string): void {
        const socket = this.sockets.get(clientId);
        if (socket) {
            socket.close();
            this.cleanup(clientId);
        }
    }

    public addMessageListener(clientId: string, listener: (message: WebSocketMessage) => void): void {
        if (!this.messageListeners.has(clientId)) {
            this.messageListeners.set(clientId, []);
        }
        this.messageListeners.get(clientId)!.push(listener);
    }

    public removeMessageListener(clientId: string, listener: (message: WebSocketMessage) => void): void {
        const listeners = this.messageListeners.get(clientId);
        if (listeners) {
            this.messageListeners.set(clientId, listeners.filter(l => l !== listener));
        }
    }

    public addStatusListener(clientId: string, listener: (connected: boolean) => void): void {
        if (!this.statusListeners.has(clientId)) {
            this.statusListeners.set(clientId, []);
        }
        this.statusListeners.get(clientId)!.push(listener);
    }

    public removeStatusListener(clientId: string, listener: (connected: boolean) => void): void {
        const listeners = this.statusListeners.get(clientId);
        if (listeners) {
            this.statusListeners.set(clientId, listeners.filter(l => l !== listener));
        }
    }

    public isConnected(clientId: string): boolean {
        const socket = this.sockets.get(clientId);
        return socket?.readyState === WebSocket.OPEN;
    }

    private notifyMessageListeners(clientId: string, message: WebSocketMessage): void {
        const listeners = this.messageListeners.get(clientId);
        if (listeners) {
            listeners.forEach(listener => listener(message));
        }
    }

    private notifyStatusListeners(clientId: string, connected: boolean): void {
        const listeners = this.statusListeners.get(clientId);
        if (listeners) {
            listeners.forEach(listener => listener(connected));
        }
    }

    private cleanup(clientId: string): void {
        this.sockets.delete(clientId);
        this.messageListeners.delete(clientId);
        this.statusListeners.delete(clientId);
    }
}

export const socketManager = SocketManager.getInstance();