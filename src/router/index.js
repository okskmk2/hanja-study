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
            path: '',
            component: () => import("../views/kc/KcHome.vue")
          },
          {
            path: 'lv8',
            component: () => import("../views/kc/lv8"),
            children: [
              {
                path: '',
                component: () => import('../views/kc/lv8/Home.vue')
              },
              {
                path: 'letters',
                component: () => import('../views/kc/lv8/Letters.vue')
              }
            ]
          },
          {
            path: 'lv7',
            component: () => import("../views/kc/lv7")
          },
          {
            path: 'lv6',
            component: () => import("../views/kc/lv6")
          },
          {
            path: 'lv5',
            component: () => import("../views/kc/lv5")
          },
          {
            path: 'lv4',
            component: () => import("../views/kc/lv4")
          },
          {
            path: 'lv3',
            component: () => import("../views/kc/lv3")
          },
          {
            path: 'lv2',
            component: () => import("../views/kc/lv2")
          },
          {
            path: 'lv1',
            component: () => import("../views/kc/lv1")
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
