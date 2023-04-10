<template>
    {{ $route.fullPath }}
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <Editor :defaultConfig="editorConfig" :mode="mode" style="height: 400px;overflow-y: hidden;" @onCreated="handleCreated"
        @onChange="handleChange" @onDestroyed="handleDestroyed" @onFocus="handleFocus" @onBlur="handleBlur"
        @customAlert="customAlert" @customPaste="customPaste" />
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef, onMounted, type ShallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/core';
import { useEditorStore } from '@/stores/Editor';

const editorModel = useEditorStore();

const editorRef: ShallowRef<IDomEditor | undefined> = shallowRef<IDomEditor>()
const mode = 'default';

// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        editorModel.html = '<p>模拟 Ajax 异步设置内容</p>'
    }, 1500)
})

const toolbarConfig: Partial<IToolbarConfig> = {

};
const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    editorModel.editors.push(editor);
}

const handleChange = (editor: IDomEditor) => {
    editorModel.html = editor.getHtml();
}

const handleDestroyed = (editor: IDomEditor) => {
    const index = editorModel.editors.findIndex(e => e.id === editor.id);
    if (index === -1) { return }
    editorModel.editors.splice(index, 1)
}
const handleFocus = (editor: IDomEditor) => {
    console.log('focus: ', editor.id);
    /*     editor.apply({
            "type": "insert_node",
            "path": [
                0
            ],
            "node": {
                "type": "table",
                "width": "auto",
                "children": [
                    {
                        "type": "table-row",
                        "children": [
                            {
                                //@ts-ignore
                                "type": "table-cell",
                                "children": [
                                    {
                                        "text": ""
                                    }
                                ],
                                "isHeader": true
                            }
                        ]
                    }
                ]
            }
        }); */

}
const handleBlur = () => {

}
const customAlert = () => {

}
const customPaste = () => {

}

defineExpose({
    editorRef
})

</script>

<style scoped></style>