<template>
  <div>
    <v-container grid-list-xs stye>
      <v-layout row wrap justify-center text-sm-center>
        <v-flex xs4>
          <v-card style="width: 100%; padding: 5vh">
            <h2>Register</h2>
            <v-layout column wrap>
              <v-form v-on:submit.prevent="register">
                <Fail v-bind:status="fail" v-bind:msg="alertMsg"/>
                <Success v-bind:status="success" v-bind:msg="alertMsg"/>
                <v-text-field v-model="email" label="Email" required></v-text-field>
                <v-text-field type="password" v-model="password" label="Password" required></v-text-field>
              </v-form>
              <v-btn type="submit" color="success" @click="register">Register</v-btn>
            </v-layout>
          </v-card>
          <v-container grid-list-xs>
            <v-layout column wrap text-sm-center>
              <h5>Already have account?</h5>
              <a href="#" @click="login">Login</a>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
    <Progress v-bind:dialog="dialog"/>
  </div>
</template>

<script>
import axios from "../helpers/axios.js";
import Progress from "../components/Progress/Progress";
import Fail from "../components/Alert/Fail/Fail";
import Success from "../components/Alert/Success/Success";

export default {
  components: {
    Progress,
    Fail,
    Success
  },
  data() {
    return {
      email: null,
      password: null,
      dialog: false,
      fail: false,
      success: false,
      alertMsg: ""
    };
  },
  methods: {
    login() {
      this.$router.replace(`/login`);
    },
    register() {
      this.dialog = true;
      axios
        .post(`/users`, {
          email: this.email,
          password: this.password
        })
        .then(result => {
          this.dialog = false;
          this.success = true
          this.fail = false,
          this.alertMsg = "Register success, you can login"
          this.email = ''
          this.password = ''
        })
        .catch(err => {
          this.success = false;
          this.fail = true;
          this.dialog = false;
          this.alertMsg = "Email sudah ada";
        });
    }
  }
};
</script>