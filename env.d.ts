/// <reference types="vite/client" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";

    const vueComponent: DefineComponent<{}, {}, any>;

    export default vueComponent;
}

import { SlateDescendant, SlateElement, SlateText } from '@wangeditor/editor'
declare module '@wangeditor/editor' {
    // 扩展 Text
    interface SlateText {
        text: string
    }

    // 扩展 Element
    interface SlateElement {
        type: string
        children: SlateDescendant[]
    }
}
