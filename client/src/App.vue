<template>
  <v-app dark>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import a from './helpers/axios';

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      //
    };
  },
  beforeCreate() {
    
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");
</style>

