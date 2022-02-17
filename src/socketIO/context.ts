import React from 'react';
import { io } from 'socket.io-client';

export const socket = io('https://vercel.com/pdh372/hmsp-tool-management-be');
export const SocketContext = React.createContext(socket);
