<template>
  <div>
    <v-card v-for="(item, index) in answers" :key="index" style="margin-bottom: 1vh">
      <v-container grid-list>
        <v-layout column wrap>
          <v-flex xs6>
            <h3>{{item.title}}</h3>
          </v-flex>
          <v-layout row wrap>
            <v-flex>
              <v-btn color="warning" @click="$router.replace(`/question/${item.question}/${index}`)">View</v-btn>
              <v-btn
                color="warning"
                @click="openEditAnswer(item.title, item._id)"
              >Edit</v-btn>
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
            <span class="headline">Edit Answer</span>
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
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="editAnswer()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            editFormValue: {
                title: '',
                id: null
            }
        }
    },
    methods: {
        openEditAnswer(title, id) {
            this.dialog = true
            this.editFormValue.id = id
            this.editFormValue.title = title
        },
        editAnswer() {
            this.$store.dispatch(`editAnswer`, {
                title: this.editFormValue.title,
                id: this.editFormValue.id
            })
        }
    },
    computed: {
        answers() {
            return this.$store.state.myAnswers
        }
    },
    
}
</script>
