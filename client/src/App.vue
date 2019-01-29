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
    a.get(`/questions`, {
      headers: {
        token: localStorage.token
      }
    })
      .then(result => {
        this.$store.dispatch("fetchQuestion", result.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");
</style>

