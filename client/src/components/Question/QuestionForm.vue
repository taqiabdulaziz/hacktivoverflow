<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="warning">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Ask Question</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="createQuestion">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-xs>
          <v-layout row wrap style="height: 50vh">
            <v-flex xs6>
              <v-container fill-height>
                <v-layout row wrap align-center>
                  <v-flex class="text-xs-center">
                    <v-img
                      :src="`https://cdn.sstatic.net/Img/svg-spots/illustration-new-question.svg?v=4cdefc7ad71e`"
                      aspect-ratio="1"
                      width="50%"
                    ></v-img>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs6>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="formData.title" label="Title" required></v-text-field>
                <v-textarea
                height="50vh"
                  outline
                  label="Description"
                  v-model="formData.description"
                ></v-textarea>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: [`dialog`],
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
      formData: {
        title: '',
        description: ''
      },
      dialog: false
    };
  },
  methods: {
    createQuestion() {
      this.$store.dispatch(`addQuestion`, {
        title: this.formData.title,
        description: this.formData.description
      })
      this.dialog = false
    }
  },
  watch: {
    dialog: function() {
      if (this.dialog == false) {
        this.$emit(`close`);
      }
    }
  }
};
</script>