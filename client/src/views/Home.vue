<template>
  <div>
    <Toolbar/>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs3 style="margin-top: 0px">
          <v-btn style="margin-bottom: 4vh" block color="warning">Start a Question</v-btn>
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
          <v-card style="height: 1000px">
            awda
            awdawd
            awd
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar";

export default {
  components: {
    Toolbar
  }
};
</script>
