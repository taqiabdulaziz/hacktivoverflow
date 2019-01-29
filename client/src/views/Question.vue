<template>
  <div>
    <Toolbar/>
    <v-container grid-list-xs>
      <v-layout row wrap>
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
                <p style="margin-top: 5vh">{{questionData.description}}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <br>
        <hr>
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
                <p style="margin-top: 5vh">{{questionData.description}}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar";
import a from "../helpers/axios";
export default {
  components: {
    Toolbar
  },
  data() {
    return {
      answerData: []
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
    upvoteAnswer(id) {},
    downvoteAnswer(id) {}
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
        headers : {
            token: localStorage.token
        }
    }).then((result) => {
        this.answerData = result.data
    }).catch((err) => {
        
    });
  }
};
</script>

<style>
.vote:hover {
  cursor: pointer;
}
</style>
