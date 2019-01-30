<template>
  <div>
    <Toolbar/>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs3 style="margin-top: 0px">
          <v-btn
            style="margin-bottom: 4vh"
            block
            color="warning"
            @click="openQuestionForm"
          >Start a Question</v-btn>
          <v-container grid-list-xs>
            <v-layout row wrap style="margin-bottom: 3vh">
              <v-icon>home</v-icon>
              <h4 class="font-weight-regular" style="margin-left:2vh">All Discussion</h4>
            </v-layout>
            <v-layout row wrap style="margin-bottom: 3vh">
              <v-icon>bookmark</v-icon>
              <h4 class="font-weight-regular" style="margin-left:2vh">Tags</h4>
            </v-layout>
            <v-layout row wrap style="margin-bottom: 3vh">
              <v-icon>question_answer</v-icon>
              <h4 class="font-weight-regular" style="margin-left:2vh">My Questions</h4>
            </v-layout>
            <v-layout row wrap style="margin-bottom: 3vh">
              <v-icon>chat</v-icon>
              <h4 class="font-weight-regular" style="margin-left:2vh">My Answers</h4>
            </v-layout>
            <v-layout row wrap style="margin-bottom: 3vh">
              <v-icon>people</v-icon>
              <h4 class="font-weight-regular" style="margin-left:2vh">People</h4>
            </v-layout>
            <hr>
          </v-container>
        </v-flex>
        <v-flex xs9>
          <!-- <v-card style="height: 80vh"> -->
            <router-view></router-view>
          <!-- </v-card> -->
        </v-flex>
      </v-layout>
    </v-container>
    <QuestionForm v-bind:dialog="questionFormDialog" v-on:close="closeQuestionForm()"/>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar";
import QuestionForm from "../components/Question/QuestionForm";
import a from "../helpers/axios.js";

export default {
  components: {
    Toolbar,
    QuestionForm
  },
  data() {
    return {
      questionFormDialog: false
    };
  },
  methods: {
    openQuestionForm() {
      this.questionFormDialog = true;
    },
    closeQuestionForm() {
      this.questionFormDialog = false;
    },
  },
  created() {
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
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.replace(`/login`);
    }
  }
};
</script>

<style>
#questioncard:hover {
  cursor: pointer;
}
</style>
