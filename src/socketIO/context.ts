import React from 'react';
import { io } from 'socket.io-client';

export const socket = io('https://hmsp-tool-management-be.vercel.app');
export const SocketContext = React.createContext(socket);
