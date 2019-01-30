<template>
  <div>
    <v-card v-for="(item, index) in questions" :key="index" style="margin-bottom: 1vh">
      <v-container grid-list>
        <v-layout column wrap>
          <v-flex xs6>
            <h3>{{item.title}}</h3>
          </v-flex>
          <v-layout row wrap>
            <v-flex>
              <v-btn color="warning" @click="$router.replace(`/question/${item._id}/${index}`)">View</v-btn>
              <v-btn
                color="warning"
                @click="openEditQuestion(item.title, item.description, item._id)"
              >Edit</v-btn>
              <v-btn color="danger" @click="deleteQuestion(item._id)">Delete</v-btn>
            </v-flex>
            <v-flex></v-flex>
            <v-flex></v-flex>
          </v-layout>
        </v-layout>
      </v-container>
    </v-card>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="title"
                    v-model="editFormValue.title"
                    :value="editFormValue.title"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <!-- <v-textarea
                    outline
                    name="input-7-4"
                    v-model="editFormValue.description"
                    label="Outline textarea"
                    :value="editFormValue.description"
                  ></v-textarea> -->
                  <wysiwyg v-model="editFormValue.description" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="editQuestion()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import a from "../../helpers/axios";

export default {
  components: {},
  data() {
    return {
      dialog: false,
      editFormValue: {
        title: "",
        description: "",
        questionId: null
      }
    };
  },
  methods: {
    deleteQuestion(questionId) {
      this.$store.dispatch(`deleteQuestion`, questionId);
    },
    openEditQuestion(title, description, questionId) {
      this.dialog = true;
      this.editFormValue.title = title;
      this.editFormValue.description = description;
      this.editFormValue.questionId = questionId;
    },
    editQuestion() {
      this.$store.dispatch(`editQuestion`, {
        title: this.editFormValue.title,
        description: this.editFormValue.description,
        questionId: this.editFormValue.questionId
      });
      this.dialog = false;
    }
  },
  computed: {
    questions() {
      let data = this.$store.state.questions.filter((value, index) => {
        if (value.userId == localStorage.id) {
          return true;
        }
      });
      return data;
    }
  },
  beforeCreate() {}
};
</script>

<style>
</style>