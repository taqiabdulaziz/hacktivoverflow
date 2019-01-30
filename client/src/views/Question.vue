<template>
  <div>
    <Toolbar/>
    <v-container grid-list-xs>
      <v-layout column wrap>
        <h2>Question</h2>
        <v-card width="100%">
          <v-container grid-list-xs>
            <v-layout row wrap style="padding: 5vh">
              <v-flex>
                <v-layout column wrap>
                  <v-btn flat icon color="blue lighten-2">
                    <v-icon @click="upvoteQuestion">thumb_up</v-icon>
                  </v-btn>
                  <h1
                    style="margin-left: 19px"
                  >{{(questionData.upvotes.length)-(questionData.downvotes.length)}}</h1>
                  <v-btn flat icon color="red lighten-2">
                    <v-icon @click="downvoteQuestion">thumb_down</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs11>
                <h1 class="font-weight-regular">{{questionData.title}}</h1>
                <p style="margin-top: 5vh" v-html="questionData.description"></p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        
<h3 style="margin-bottom: 2vh; margin-top: 2vh">Replies</h3>
        <v-layout column wrap style="margin: 0vh">
          <v-card
            v-for="(answer, index) in answerData"
            :key="index"
            style="padding: 2vh; width: 70%; margin: 2vh"
          >
            <v-layout row wrap align-center>
              <v-flex text-sm-center>
                <v-btn flat icon color="lighten-2">
                  <v-icon @click="upvoteAnswer(answer._id, index)">thumb_up</v-icon>
                </v-btn>
                <h3>{{ (answer.upvotes.length) - (answer.downvotes.length) }}</h3>
                <v-btn flat icon color="lighten-2">
                  <v-icon @click="downvoteAnswer(answer._id, index)">thumb_down</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs10>{{answer.title}} | {{answer.userId.email}}</v-flex>
            </v-layout>
          </v-card>
        </v-layout>

        <h3 style="margin-bottom: 2vh">Reply</h3>
        <v-card style="width: 70%; padding: 5vh">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-textarea outline name="input-7-4" v-model="replyForm"></v-textarea>
            <v-btn :disabled="!valid" color="warning" @click="reply">Reply</v-btn>
          </v-form>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Toolbar from "../components/Toolbar";
import a from "../helpers/axios";
export default {
  components: {
    Toolbar
  },
  data() {
    return {
      answerData: [],
      replyForm: ''
    };
  },
  computed: {
    questionData() {
      return this.$store.state.questions[this.$route.params.index];
    }
  },
  methods: {
    upvoteQuestion() {
      this.$store.dispatch(`upvoteQuestion`, this.questionData._id);
    },
    downvoteQuestion() {
      this.$store.dispatch(`downvoteQuestion`, this.questionData._id);
    },
    upvoteAnswer(id, index) {
      a.post(
        `/answers/${id}/upvote`,
        {
          userId: localStorage.id
        },
        {
          headers: {
            token: localStorage.token
          }
        }
      )
        .then(result => {
          Vue.set(this.answerData, index, result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    downvoteAnswer(id, index) {
      a.post(
        `/answers/${id}/downvote`,
        {
          userId: localStorage.id
        },
        {
          headers: {
            token: localStorage.token
          }
        }
      )
        .then(result => {
          Vue.set(this.answerData, index, result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    reply() {
      a.post(`/answers`, {
        title: this.replyForm,
        question: this.$route.params.id,
        userId:localStorage.id
      }, {
        headers : {
          token: localStorage.token
        }
      }).then((result) => {
        this.answerData.push(result.data)
        this.replyForm = ''
      }).catch((err) => {
        console.log(err);
        
      });
    }
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

    a.get(`/questions/answer/${this.$route.params.id}`, {
      headers: {
        token: localStorage.token
      }
    })
      .then(result => {
        this.answerData = result.data;
      })
      .catch(err => {});
  }
};
</script>

<style>
.vote:hover {
  cursor: pointer;
}
</style>
