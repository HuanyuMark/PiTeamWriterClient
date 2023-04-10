import { io as socketFactory } from 'socket.io-client'
import { syncMutation } from './messageBoard'
import type { MsgMutationRecord } from './pojo/User';

export const socket = socketFactory('http://localhost:3000');

export enum SocketEvent {
    SEND_MSG_INPUT = 's:/msg/input',
    GET_MSG_INPUT = 'c:/msg/input',
    CONNECT = 'connect',
}

socket.on(SocketEvent.CONNECT, () => {
    console.log(socket.id);
    socket.on(SocketEvent.GET_MSG_INPUT, (mutation: MsgMutationRecord) => syncMutation(socket, mutation));
})
