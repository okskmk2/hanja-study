import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import LoginForm from "../views/LoginForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        component: Home
      },
      {
        path: 'kc',
        component: () => import("../views/kc"),
        children: [
          {
            path: 'lv8',
            component: () => import("../views/kc/level8")
          }
        ]
      }
    ]
  },
  {
    path: '/login',
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
