import { reactive, ref, shallowReactive, watch, type Component, type ComponentInternalInstance } from 'vue'
import { defineStore } from 'pinia'
import type { IDomEditor } from '@wangeditor/editor';

const state = () => {
  return reactive({
    html: '<p>hello</p>',
    editors: shallowReactive<IDomEditor[]>([])
  })
}


export const useEditorStore = defineStore('editor', state);

