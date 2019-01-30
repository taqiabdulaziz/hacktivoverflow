import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import a from './helpers/axios';

export default new Vuex.Store({
  state: {
    dataLogin: null,
    questions: [],
    myAnswers: []
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
    myanswer(state, answers) {
      state.myAnswers = answers
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
    },
    deleteQuestion(state, questionId) {
      state.questions.forEach((element, index) => {
        if (element._id == questionId) {
          Vue.delete(state.questions, index)
        }
      })
    },
    editQuestion(state, data) {
      state.questions.forEach((e, index) => {
        if (e._id == data._id) {
          Vue.set(state.questions, index, data)
        }
      })
    },
    editAnswer(state, answer) {
      state.myAnswers.forEach((e, index) => {
        if (e._id == answer._id) {
          Vue.set(state.myAnswers, index, answer)
        }
      })
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
    fetchMyAnswer(context, data) {
      context.commit(`myanswer`, data)
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
        description: data.description,
        userId: data.userId
      }, {
          headers: {
            token: localStorage.token
          }
        }).then((result) => {
          context.commit(`addQuestion`, result.data)
        }).catch((err) => {
          console.log(err);

        });
    },
    deleteQuestion(context, questionId) {
      a.delete(`/questions/${questionId}`, {
        headers: {
          token: localStorage.token
        }
      }).then((result) => {
        context.commit(`deleteQuestion`, result.data._id)
      }).catch((err) => {
        console.log(err);

      });
    },
    editQuestion(context, data) {
      a.put(`/questions/${data.questionId}`, {
        title: data.title,
        description: data.description
      }, {
          headers: {
            token: localStorage.token
          }
        }).then((result) => {
          context.commit(`editQuestion`, result.data)

        }).catch((err) => {
          console.log(err);

        });

    },
    editAnswer(context, data) {
      a.put(`/answers/${data.id}`, {
        title: data.title
      }, {
          headers: {
            token: localStorage.token
          }
        }).then((result) => {
          context.commit(`editAnswer`, result.data)

        }).catch((err) => {
          console.log(err.data);

        });

    }
  }
})
