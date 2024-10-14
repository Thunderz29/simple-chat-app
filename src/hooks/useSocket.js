import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketConnection = io({
            path: '/api/socket',
        });
        setSocket(socketConnection);

        socketConnection.on('connect', () => {
            console.log('Successfully connected to the server');
        });

        socketConnection.on('message', (msg) => {
            new Notification('Incoming Message', { body: `${msg.username}: ${msg.message}` });
        });

        socketConnection.on('disconnect', () => {
            console.log('Server connection lost');
        });

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    return socket;
};

export default useSocket;
