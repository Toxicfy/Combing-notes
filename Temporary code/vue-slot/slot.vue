<!-- 在Vue中实际上 -->

<!-- 可以粗略的认为prop用于将数据从父组件传递到子组件-->
<!-- slot 可以将html从父组件传递到子组件 (zhihu/question/37548226)-->


<!-- 组件默认有插槽的位置（可以设置默认的内容），而父组件在使用该组件的时候可以将父组件的html赋给该组件（或者说覆盖到插槽处） -->

<!-- <slot></slot> 写在childCompont -->
<div class="dialog-panel">
  <slot>
    <!-- slot has default content -->
    <dialog-panel>
      <div class="dialog-header">
        <h3 class="title">Title</h3>
        <button class="close">X</button>
      </div>
    </dialog-panel>
  </slot>
  <div class="dialog-content">this is a dialog-content</div>
  <div class="dialog-footer">
    <el-button class="primary" plain> 取消 </el-button>
    <el-button class="primary"> 确定 </el-button>
  </div>
</div>
export default DialogPanel;

<!-- Parent Component -->
import DialogPanel from './component/dialogPanel'
<template>
  <DialogPanel>
    <div slot="defalut">
      <div class="dialog-header">
        <h3 class="title">newTitle</h3>
        <button class="close">X</button>
      </div>
    </div>
  </DialogPanel>
</template>

<!-- render content at parent Component-->
<dialog-panel>
  <div class="dialog-header">
    <h3 class="title">newTitle</h3>
    <button class="close">X</button>
  </div>
  <div class="dialog-content">this is a dialog-content</div>
  <div class="dialog-footer">
    <el-button class="primary" plain> 取消 </el-button>
    <el-button class="primary"> 确定 </el-button>
  </div>
</dialog-panel>
