import { MsgMutation, User } from '@/sockets/pojo/User'
import type { IDomEditor, Operation } from '@wangeditor/editor'
import { Boot } from '@wangeditor/editor'
import { socket, SocketEvent } from '../../sockets/index'
export function uploaderMutation<T extends IDomEditor>(editor: T): T {   // TS 语法

    const {
        insertBreak, deleteBackward, setHtml,
        insertText, insertData, insertFragment,
        insertNode, normalizeNode, addMark,
        getParentNode, getNodePosition, dangerouslyInsertHtml, apply
    } = editor // 获取当前 editor API
    const newEditor = editor

    /*     // 重写 insertBreak 换行
        newEditor.insertBreak = () => {
            // if: 是 ctrl + enter ，则执行 insertBreak
            console.log('insertBreak');
            insertBreak()
            // else: 则不执行换行
            return
        }
    
        // 重写 deleteBackward 向后删除
        newEditor.deleteBackward = unit => {
            // if： 某种情况下，执行默认的删除
            console.log('insertBreak');
            deleteBackward(unit)
            // else: 其他情况，则不执行删除
            return
        }
    
        newEditor.setHtml = html => {
            console.log('setHtml');
            setHtml(html);
        }
    
        newEditor.insertText = text => {
            console.log('insertText', text);
            insertText(text);
        }
        newEditor.insertData = text => {
            console.log('insertData');
            insertData(text);
        }
        newEditor.insertFragment = text => {
            console.log('insertFragment');
            insertFragment(text);
        }
        newEditor.insertNode = text => {
            console.log('insertNode');
            insertNode(text);
        }
    
        newEditor.addMark = (key, val) => {
            console.log('addMark', key, val);
            addMark(key, val);
        }
    
        newEditor.getParentNode = node => {
            console.log('getParentNode', node);
            return getParentNode(node);
        }
    
        newEditor.getNodePosition = node => {
            console.log('getNodePosition', node);
            return getNodePosition(node);
        }
    
        newEditor.dangerouslyInsertHtml = (html, isRecursive) => {
            console.log('dangerouslyInsertHtml', html, isRecursive);
            return dangerouslyInsertHtml(html, isRecursive);
        }
    
        newEditor.normalizeNode = entry => {
            if (!(
                entry[0].hasOwnProperty('id') &&
                (entry[0] as IDomEditor).id.startsWith('wangEditor'))
            ) {
                console.log('normalizeNode', entry);
            }
            normalizeNode(entry);
            console.log('after normalize: ', entry);
        } */

    newEditor.apply = opration => {
        console.log('apply: ', opration);
        // if (socket.id !== mutation.getUser().getSocketId()) {
        socket.emit(SocketEvent.SEND_MSG_INPUT, new MsgMutation(new User(socket.id), opration));
        // }
        return apply(opration);
    }

    newEditor.on('callOrignalApply', apply);

    return newEditor;
}

const isParent = (type: any, parentType: any) => {
    let _type = type;
    while (_type) {
        if (_type === parentType) {
            return true;
        }
        _type = _type.__proto__;
    }
    return false;
}

Boot.registerPlugin(uploaderMutation);