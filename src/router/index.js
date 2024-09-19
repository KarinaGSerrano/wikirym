import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import WikiView from "../views/WikiView.vue";
import LogInView from "../views/LogInView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/wiki",
    name: "wiki",
    component: WikiView,
  },
  {
    path: "/logIn",
    name: "logIn",
    component: LogInView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
