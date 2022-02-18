import React from 'react';
import { io } from 'socket.io-client';
const host = process.env.REACT_APP_HOST_BE || '';
console.log("🚀 ~ file: context.ts ~ line 4 ~ host", host)

export const socket = io(host);

export const SocketContext = React.createContext(socket);
