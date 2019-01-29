<template>
  <div>
    <v-container grid-list-xs stye>
      <v-layout row wrap justify-center text-sm-center>
        <v-flex xs4>
          <v-card style="width: 100%; padding: 5vh">
            <h2>Login</h2>
            <v-layout column wrap>
              <v-form v-on:submit.prevent="login">
                <Fail v-bind:status="fail" v-bind:msg="alertMsg"/>
                <v-text-field v-model="email" label="Email" required></v-text-field>
                <v-text-field type="password" v-model="password" label="Password" required></v-text-field>
              </v-form>
              <v-btn color="success" @click="login">Login</v-btn>
            </v-layout>
          </v-card>
          <v-container grid-list-xs>
            <v-layout column wrap text-sm-center>
              <h5>Dont have account?</h5>
              <a href="#" @click="register">Register</a>
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
        axios.post(`/users/login`, {
            email: this.email,
            password: this.password
        }).then((result) => {
            this.fail = false
            this.success = true
            this.$store.dispatch('login', result.data)
            this.$router.replace(`/`)
            for (const key in result.data) {
              localStorage[key] = result.data[key]
            }
        }).catch((err) => {
            this.success = false
            this.fail = true
            this.alertMsg = "Email/Password salah"
        });
    },
    register() {
      this.$router.replace(`/register`);
    }
  },
  beforeCreate() {
    if (localStorage.token) {
      this.$router.replace(`/`)
    }
  }
};
</script>