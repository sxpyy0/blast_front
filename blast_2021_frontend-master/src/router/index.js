import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const TheContainer = () => import("@/containers/TheContainer");

const Home = () => import("@/blast/Home");

const BlastDiagnose = () => import("@/blast/BlastDiagnose");
const SubIndexPage = () => import("@/blast/SubIndexPage");
const AlertPage = () => import("@/blast/AlertPage");
const PageList = () => import("@/blast/PageList");
const Home3 = () => import("@/blast/Home3");

const CircleTest = () => import("@/blast/components/CircleGroupTest");

const BasicParamLine = () => import("@/blast/components/BasicParamLine");

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: configRoutes(),
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;

function configRoutes() {
  return [
    {
      path: "/list",
      name: "List",
      component: PageList,
      meta: {
        title: "目录",
      },
    },
    {
      path: "/",
      redirect: "/home",
      name: "Home_",
      component: TheContainer,
      children: [
        {
          path: "home",
          name: "Home",
          component: Home,
          meta: {
            title: "多基地炉况诊断",
          },
        },
        {
          path: "home3",
          name: "Home3",
          component: Home3,
          meta: {
            title: "多基地炉况诊断",
          },
        },
        {
          path: "diagnose",
          name: "diagnose",
          component: BlastDiagnose,
          meta: {
            title: "高炉稳定性指数概览",
          },
        },
        {
          path: "subindex",
          name: "subindex",
          component: SubIndexPage,
          meta: {
            title: "稳定性子指数详情",
          },
        },
        {
          path: " ",
          name: "alert",
          component: AlertPage,
          meta: {
            title: "预警信息查询",
          },
        },
        {
          path: "circle_test",
          name: "circle_test",
          component: CircleTest,
          meta: {
            title: "circle_test",
          },
        },
        {
          path: "basic_param",
          name: "basic_param",
          component: BasicParamLine,
          meta: {
            title: "basic_param",
          },
        },
      ],
    },
  ];
}
