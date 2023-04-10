<template>
    <div id="App">
        <router-link to="/c1">Editor 1</router-link>
        <router-link to="/c2">Editor 2</router-link>
        <router-view></router-view>
        <!-- <CommonEditor></CommonEditor> -->
        <!-- <CommonEditor></CommonEditor> -->
    </div>
</template>
<script setup lang="ts">
import './utils/plugins/ModifyUploader'
</script>
<style scoped>
#App {
    display: flex;
    flex-direction: column;
}
</style>
