<template>
  <div>
    <v-container grid-list-xs v-for="(item, index) in this.$store.state.questions" :key="index">
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mx-auto"
          color="warning"
          id="questioncard"
          @click="openQuestion(item._id, index)"
        >
          <v-layout row wrap>
            <v-flex xs5>
              <v-layout row wrap text-sm-center>
                <v-flex>
                  <v-container grid-list-xs>
                    <v-layout column wrap>
                      <h3>{{(item.upvotes.length)-(item.downvotes.length)}}</h3>
                      <h5>Votes</h5>
                    </v-layout>
                  </v-container>
                </v-flex>
                <v-flex>
                  <v-container grid-list-xs>
                    
                  </v-container>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs7>
              <h3 class="font-weight-light">{{item.title}}</h3>
            </v-flex>
          </v-layout>
        </v-card>
      </v-hover>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    openQuestion(id, index) {
      this.$router.replace(`/question/${id}/${index}`);
    }
  }
};
</script>

<style>
</style>
