<template>
  <div>
    <Toolbar/>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs3 style="margin-top: 0px; padding: 18px">
          <v-btn
            style="margin-bottom: 4vh"
            block
            color="warning"
            @click="openQuestionForm"
          >Start a Question</v-btn>
          <v-container grid-list-xs>
            <v-layout
              row
              wrap
              style="margin-bottom: 3vh"
              class="menu"
              @click="navigate('discussion')"
            >
              <v-icon>home</v-icon>
              <h4 class="menutitle font-weight-regular" style="margin-left:2vh">All Discussion</h4>
            </v-layout>
            
            <v-layout
              row
              wrap
              style="margin-bottom: 3vh"
              class="menu"
              @click="navigate('myquestions')"
            >
              <v-icon>question_answer</v-icon>
              <h4 class="menutitle font-weight-regular" style="margin-left:2vh">My Questions</h4>
            </v-layout>
            <v-layout
              row
              wrap
              style="margin-bottom: 3vh"
              class="menu"
              @click="navigate('myanswers')"
            >
              <v-icon>chat</v-icon>
              <h4 class="menutitle font-weight-regular" style="margin-left:2vh">My Answers</h4>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs9>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
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
    navigate(routeName) {
      this.$router.replace(`/${routeName}`);
    }
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
      a.get(`/answers/myanswer/${localStorage.id}`, {
        headers : {
          token: localStorage.token
        }
      }).then((result) => {
        this.$store.dispatch("fetchMyAnswer", result.data)
      }).catch((err) => {
        
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

.menu:hover {
  cursor: pointer;
}

.menutitle:hover {
  color: #fb8c00;
}
</style>
