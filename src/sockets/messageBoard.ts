import { useEditorStore } from "@/stores/Editor";
import { EditorEvent } from "@/utils/EditorPlugins";
import type { SelectionOperation } from "@wangeditor/editor";
import type { Socket } from "socket.io-client";
import type { MsgMutationDO } from "./pojo/User";

export const syncMutation = (socket: Socket, mutation: MsgMutationDO) => {
    const store = useEditorStore();
    // console.log('syncMutation: ', socket.id, mutation);
    store.editors.forEach(e => {
        // // // 不同步 空选择操作
        if (mutation.operation.type === 'set_selection' && (mutation.operation as SelectionOperation).properties === null) {
            return;
        }
        // if (mutation.operation.type === 'set_selection') {
        //     return;
        // }

        console.log(EditorEvent.CALL_APPLY, mutation.operation);
        e.emit(EditorEvent.CALL_APPLY, mutation.operation);

        // e.apply(mutation.operation);
    })
}