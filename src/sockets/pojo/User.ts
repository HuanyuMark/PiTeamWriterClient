import type { Operation } from "@wangeditor/editor";

export class User {
    private socketId: string;

    constructor(socketId: string) {
        this.socketId = socketId;
    }
    getSocketId() {
        return this.socketId;
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
}

export class UserRecord {
    socketId: string;

    constructor(socketId: string) {
        this.socketId = socketId;
    }
}

export class MsgMutationRecord {
    user: UserRecord;
    operation: Operation;
    constructor(user: UserRecord, operation: Operation) {
        this.user = user;
        this.operation = operation;
    }
}