<template>
  <v-toolbar>
    <v-toolbar-title>Hackoverflow</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(`logout`)
      this.$router.replace(`/login`)
    }
  },
}
</script>
