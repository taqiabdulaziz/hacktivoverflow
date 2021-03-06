import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Question from './views/Question.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: `/discussion`,
          component: () => import(`./views/Home/Discussion.vue`)
        },
        {
          path: `/myquestions`,
          component: () => import(`./views/Home/MyQuestion.vue`)
        },
        {
          path: `/myanswers`,
          component: () => import(`./views/Home/MyAnswer.vue`)
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: `/login`,
      name: `login`,
      component: () => import(`./views/Login.vue`)
    },
    {
      path: `/register`,
      name: `register`,
      component: () => import(`./views/Register.vue`)
    },
    {
      path: `/question/:id/:index`,
      name: `question`,
      component: Question
    }
  ]
})
