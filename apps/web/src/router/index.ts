import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '@/pages/WelcomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CreateAccountPage from '@/pages/CreateAccountPage.vue'
import HomePage from '@/pages/HomePage.vue'
import LearnPage from '@/pages/LearnPage.vue'
import GeographyLearnPage from '@/pages/GeographyLearnPage.vue'
import EuropeLearningPage from '@/pages/EuropeLearningPage.vue'
import QuizPage from '@/pages/QuizPage.vue'
import QuizPlayPage from '@/pages/QuizPlayPage.vue'
import QuizResultsPage from '@/pages/QuizResultsPage.vue'
import QuizReviewPage from '@/pages/QuizReviewPage.vue'
import FriendsPage from '@/pages/FriendsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'welcome', component: WelcomePage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/create-account', name: 'create-account', component: CreateAccountPage },
    { path: '/home', name: 'home', component: HomePage },
    { path: '/learn', name: 'learn', component: LearnPage },
    { path: '/learn/geography', name: 'learn-geography', component: GeographyLearnPage },
    { path: '/learn/geography/europe', name: 'learn-geography-europe', component: EuropeLearningPage },
    { path: '/quiz', name: 'quiz', component: QuizPage },
    { path: '/quiz/play', name: 'quiz-play', component: QuizPlayPage },
    { path: '/quiz/results/:id', name: 'quiz-results', component: QuizResultsPage },
    { path: '/quiz/results/:id/review', name: 'quiz-review', component: QuizReviewPage },
    { path: '/friends', name: 'friends', component: FriendsPage },
  ],
})

export default router
