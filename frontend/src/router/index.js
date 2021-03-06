import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "../layout/MainLayout.vue";
import Home from "../views/Home.vue";
import SelectedHanja from "../views/SelectedHanja.vue";
import TestBank from "../views/TestBank.vue";
import FourLetters from "../views/FourLetters.vue";
import LoginForm from "../views/LoginForm.vue";
import Quiz from "../views/Quiz.vue";
import HanjaDetail from "../views/HanjaDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'selected-hanja',
        component: SelectedHanja
      },
      {
        path: 'test-bank',
        component: TestBank
      },
      {
        path: 'four-letters',
        component: FourLetters
      },
      {
        path: 'quiz',
        component: Quiz
      },
      {
        path: 'hanja/:hanja_id',
        component: HanjaDetail
      },
    ]
  },
  {
    path: '/login-form',
    component: LoginForm
  },
  {
    path: "*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   if (to.hash) {
  //     return { selector: to.hash, offset: { x: 0, y: 130 } };
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // },
});

router.afterEach((to, from) => {
  const titleList = [];
  titleList.push("한자급수시험");
  if (to.meta.title) {
    titleList.push(to.meta.title);
  }
  document.title = titleList.join(" | ");
});

export default router;
