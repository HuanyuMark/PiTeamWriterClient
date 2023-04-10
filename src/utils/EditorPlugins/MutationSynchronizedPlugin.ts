import { MsgMutation, thisUser, thisUserDo, User, UserDO } from '@/sockets/pojo/User'
import type { IDomEditor, Operation } from '@wangeditor/editor'
import { EditorEvent } from '.'
import { socket, SocketEvent } from '../../sockets/index'
/**
 * 负责文档同步的 mutex 锁
 */
class Mutex {
    private locked: boolean = false;
    private _holder: User | null = null;
    // ingore the lock, this is the flag indicate the editor if it can be edited
    lockIgnoredEditable: boolean = true;
    lockCallBack: (() => void) | null = null;
    unLockCallBack: (() => void) | null = null;

    get isLocked() {
        return this.locked;
    }

    get holder() {
        return this._holder;
    }

    lock(holder: User) {
        this._holder = holder;
        this.locked = true;
        if (this.lockCallBack) {
            this?.lockCallBack();
        }
    }

    unLock() {
        this._holder = null;
        this.locked = false;
        if (this.unLockCallBack) {
            this.unLockCallBack();
        }
    }
}

class MutexLockInformation {
    protected mutex: Mutex;

    constructor(mutex: Mutex) {
        this.mutex = mutex;
    }

    get locked() {
        return this.mutex.isLocked;
    }

    get holder() {
        return this.mutex.holder;
    }

    get lockIgnoredEditable() {
        return this.mutex.lockIgnoredEditable;
    }
}

const lockInfoMap = new WeakMap<IDomEditor, MutexLockInformation>();

export const getMutexLockInfo = (editor: IDomEditor) => lockInfoMap.get(editor);

export function uploaderMutation<T extends IDomEditor>(editor: T): T {   // TS 语法

    const {
        undo, redo, apply, enable, disable
    } = editor
    // use orginal api more conveniently
    const newEditor: T = editor

    const mutex = new Mutex();

    let undoing: boolean = false;

    let redoing: boolean = false;

    let lastOperation: Partial<Operation> = { type: undefined };

    mutex.lockCallBack = disable.bind(editor);

    mutex.unLockCallBack = () => {
        // before locked, if the editor were editable
        if (mutex.lockIgnoredEditable) {
            enable.call(editor);
        }
    }

    newEditor.undo = () => {
        mutex.lock(thisUser);
        undoing = true;
        undo?.call(editor);
        socket.emit(SocketEvent.SEND_MSG_UNDO, thisUserDo)
    }

    newEditor.redo = () => {
        mutex.lock(thisUser);
        redoing = true;
        redo?.call(editor);
        socket.emit(SocketEvent.SEND_MSG_REDO, thisUserDo);
    }

    newEditor.enable = () => {
        mutex.lockIgnoredEditable = true;
        if (mutex.isLocked) {
            return;
        }

        enable.call(editor);
    }

    newEditor.disable = () => {
        mutex.lockIgnoredEditable = false;
        disable.call(editor);
    }

    newEditor.isDisabled = () => mutex.isLocked || !mutex.lockIgnoredEditable;

    socket.on(SocketEvent.GET_MSG_UNDO, () => {
        console.log(SocketEvent.GET_MSG_UNDO);
        undo?.call(editor);
    });

    socket.on(SocketEvent.GET_MSG_UNDOED, () => {
        undoing = false;
    });

    socket.on(SocketEvent.GET_MSG_REDO, () => {
        redo?.call(editor);
    });

    socket.on(SocketEvent.GET_MSG_REDOED, () => {
        redoing = false;
    });

    newEditor.apply = operation => {
        // console.log('last: ', lastOperation.type, operation.type);
        if (lastOperation.type === 'split_node' && operation.type === 'merge_node') {
            lastOperation = operation;
            console.log('intercepted');
            return;
        }

        lastOperation = operation;
        console.log('apply: ', operation);
        // redo and undo is complicated, would emit other event to notify other roommates
        if (!redoing && !undoing) {
            socket.emit(SocketEvent.SEND_MSG_INPUT, new MsgMutation(new User(socket.id), operation));
        }
        return apply.call(editor, operation);
    }

    newEditor.on(EditorEvent.CALL_APPLY, (operation: Operation) => {
        lastOperation = operation;
        return apply.call(editor, operation);
    });

    newEditor.on(EditorEvent.MUTEX_LOCK, (holderDO: UserDO) => mutex.lock(holderDO.toUser()));

    newEditor.on(EditorEvent.MUTEX_OPEN, () => mutex.unLock());

    // 将锁信息的读权限放到map里,方便外部根据editor来获取对应的锁信息
    lockInfoMap.set(newEditor, new MutexLockInformation(mutex));

    return newEditor;
}
