import { Boot } from '@wangeditor/editor'
import { uploaderMutation } from './MutationSynchronizedPlugin'

export enum EditorEvent {
    CALL_APPLY = 'call_orignal_apply',
    MUTEX_LOCK = 'mutex_lock',
    MUTEX_OPEN = 'mutex_release'
}

Boot.registerPlugin(uploaderMutation);

