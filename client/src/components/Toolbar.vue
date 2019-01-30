<template>
  <v-toolbar>
    <v-toolbar-title @click="toHome" class="toolbartitle">Hacktivlow</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch(`logout`);
      this.$router.replace(`/login`);
    },
    toHome() {
      this.$router.replace(`/discussion`);
    }
  }
};
</script>

<style>
.toolbartitle:hover {
  cursor: pointer;
}
</style>

