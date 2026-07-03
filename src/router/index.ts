import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import InputPage from '../pages/InputPage.vue'
import CourseListPage from '../pages/CourseListPage.vue'
import CourseDetailPage from '../pages/CourseDetailPage.vue'
import PlaceReportPage from '../pages/PlaceReportPage.vue'
import MyPage from '../pages/MyPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/input',
      name: 'input',
      component: InputPage,
    },
    {
      path: '/courses',
      name: 'course-list',
      component: CourseListPage,
    },
    {
      path: '/courses/:courseId',
      name: 'course-detail',
      component: CourseDetailPage,
    },
    {
      path: '/places/report',
      name: 'place-report',
      component: PlaceReportPage,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
    },
  ],
})
