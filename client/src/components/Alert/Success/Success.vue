<template>
  <div>
    <v-alert v-show="status" :value="true" type="success">{{msg}}</v-alert>
  </div>
</template>

<script>
export default {
  props: ["msg", "status"],
  data() {
    return {
      msg: this.msg,
      status: this.status
    };
  }
};
</script>