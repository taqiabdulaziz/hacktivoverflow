import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import a from './helpers/axios';

export default new Vuex.Store({
  state: {
    dataLogin: null,
    questions: []
  },
  mutations: {
    login(state, data) {
      console.log('tesss')
      state.dataLogin = data
    },
    logout() {
      localStorage.clear()
    },
    questions(state, questions) {
      state.questions = questions
    },
    upvoteQuestion(state, data) {
      state.questions.forEach((element, index) => {
        if (element._id == data.id) {
          Vue.set(state.questions, index, data.result)
        }
      })
    },
    downvoteQuestion(state, data) {
      state.questions.forEach((element, index) => {
        if (element._id == data.id) {
          Vue.set(state.questions, index, data.result)
        }
      })
    },
    addQuestion(state, data) {
      state.questions.push(data)
    }
  },
  actions: {
    login(context, data) {
      context.commit('login', data)

    },
    logout(context) {
      context.commit('logout')

    },
    fetchQuestion(context, data) {
      context.commit(`questions`, data)

    },
    upvoteQuestion(context, id) {
      a.post(`/questions/${id}/upvote`, {
        userId: localStorage.id
      }, {
          headers: {
            token: localStorage.token
          }
        })
        .then(result => {
          context.commit('upvoteQuestion', {
            id: id,
            result: result.data
          })
        })
        .catch(err => {
          console.log(err);

        });
    },
    downvoteQuestion(context, id) {
      console.log(`wew`);
      
      a.post(`/questions/${id}/downvote`, {
        userId: localStorage.id
      }, {
          headers: {
            token: localStorage.token
          }
        })
        .then(result => {
          context.commit('downvoteQuestion', {
            id: id,
            result: result.data
          })
        })
        .catch(err => {
          console.log(err);

        });
    },
    addQuestion(context, data) {
      a.post(`/questions`, {
        title: data.title,
        description: data.description
      }, {
        headers: {
          token: localStorage.token
        }
      }).then((result) => {
        context.commit(`addQuestion`, result.data)
      }).catch((err) => {
        console.log(err);
        
      });
    }
  }
})
