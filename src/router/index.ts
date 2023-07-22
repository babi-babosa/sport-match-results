import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFoundPage from "@/views/NotFoundView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found-generic",
      component: NotFoundPage,
      meta: { title: "404" },
    },
  ],
});

export default router;
