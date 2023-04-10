import type { Operation } from "@wangeditor/editor";
import { socket } from '../index';

export class User {
    private socketId: string;

    constructor(socketId: string) {
        this.socketId = socketId;
    }
    getSocketId() {
        return this.socketId;
    }

    toDO() {
        return new UserDO(this.socketId);
    }
}

export class MsgMutation {
    private user: User;
    private operation: Operation;
    constructor(user: User, operation: Operation) {
        this.user = user;
        this.operation = operation;
    }
    getUser() {
        return this.user;
    }

    getOperation() {
        return this.operation;
    }

    toDO() {
        return new MsgMutationDO(this.user.toDO(), this.operation);
    }
}

export class UserDO {
    socketId: string;

    constructor(socketId: string) {
        this.socketId = socketId;
    }

    toUser() {
        return new User(socket.id);
    }
}

export class MsgMutationDO {
    user: UserDO;
    operation: Operation;
    constructor(user: UserDO, operation: Operation) {
        this.user = user;
        this.operation = operation;
    }
}

export const thisUser = new User(socket.id);

export const thisUserDo = thisUser.toDO();