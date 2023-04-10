import { io as socketFactory } from 'socket.io-client'
import { syncMutation } from './messageBoard'
import type { MsgMutationDO } from './pojo/User';

export const socket = socketFactory('http://localhost:3000');

export enum SocketEvent {
    SEND_MSG_INPUT = 's:/msg/input',
    GET_MSG_INPUT = 'c:/msg/input',
    SEND_MSG_REDO = 's:/msg/redo',
    GET_MSG_REDO = 'c:/msg/redo',
    SEND_MSG_REDOED = 's:/msg/redo/done',
    GET_MSG_REDOED = 'c:/msg/redo/done',
    SEND_MSG_UNDO = 's:/msg/undo',
    GET_MSG_UNDO = 'c:/msg/undo',
    SEND_MSG_UNDOED = 's:/msg/undo/done',
    GET_MSG_UNDOED = 'c:/msg/undo/done',
    CONNECT = 'connect',
}

socket.on(SocketEvent.CONNECT, () => {
    console.log(socket.id);
    socket.on(SocketEvent.GET_MSG_INPUT, (mutation: MsgMutationDO) => syncMutation(socket, mutation));
})
