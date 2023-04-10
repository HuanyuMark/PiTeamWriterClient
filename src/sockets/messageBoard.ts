import { useEditorStore } from "@/stores/Editor";
import type { SelectionOperation } from "@wangeditor/editor";
import type { Socket } from "socket.io-client";
import type { MsgMutationRecord } from "./pojo/User";

export const syncMutation = (socket: Socket, mutation: MsgMutationRecord) => {
    const store = useEditorStore();
    // console.log('syncMutation: ', socket.id, mutation);
    store.editors.forEach(e => {
        // // 不同步 选择操作
        if (mutation.operation.type === 'set_selection'/*  && (mutation.operation as SelectionOperation).properties === null */) {
            return;
        }

        console.log('callOrignalApply', mutation.operation);
        e.emit('callOrignalApply', mutation.operation);

        // e.apply(mutation.operation);
    })
}