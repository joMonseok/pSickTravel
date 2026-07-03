<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageContainer from '../components/common/PageContainer.vue'

const serviceItems = ['Recommendation Input', 'Travel Routes', 'Place Reports', 'My Page']
const priorityItems = ['Location', 'Mood', 'Time', 'Radius']
</script>

<template>
  <PageContainer>
    <div class="home-page">
      <section class="hero-window">
        <p class="hero-kicker">TRAVEL / RECOMMENDATION / PSICK</p>

        <div class="hero-copy">
          <h1>WE BUILD<br />TRAVEL ROUTES<br />FOR EVERY DAY.</h1>
          <p class="hero-description">
            위치, 기분, 시간에 맞춰 바로 떠날 수 있는 여행 코스를 추천합니다.
          </p>

          <div class="hero-actions">
            <RouterLink class="hero-cta" to="/input">Start Input</RouterLink>
          </div>
        </div>
      </section>

      <section class="info-board" aria-label="서비스 안내">
        <div class="info-panel">
          <p class="panel-label">Service</p>
          <ul>
            <li v-for="item in serviceItems" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="info-panel info-panel--accent">
          <p class="panel-label">Priority</p>
          <ul>
            <li v-for="item in priorityItems" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>
    </div>
  </PageContainer>
</template>

<style scoped>
.home-page {
  display: grid;
  gap: 2rem;
}

.hero-window {
  padding-top: 0.25rem;
}

.hero-kicker {
  margin: 0 0 1.25rem;
  color: rgb(17 17 17 / 55%);
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.hero-copy {
  max-width: 760px;
}

.hero-copy h1 {
  margin: 0;
  color: #111111;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: clamp(4.4rem, 10vw, 8.2rem);
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

.hero-description {
  max-width: 480px;
  margin: 1.15rem 0 0;
  color: rgb(17 17 17 / 56%);
  font-size: 0.78rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 1.25rem;
  border: 1px solid #111111;
  background: #111111;
  color: #ffffff;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-cta:hover {
  background: #1f1f1f;
}

.info-board {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  border: 1px solid rgb(17 17 17 / 10%);
}

.info-panel {
  min-height: 170px;
  padding: 2rem 1.9rem;
  border-right: 1px solid rgb(17 17 17 / 10%);
  background: #f7f5ef;
}

.info-panel--accent {
  border-right: 0;
  background: #ebe7df;
}

.panel-label {
  margin: 0 0 1.25rem;
  color: rgb(17 17 17 / 48%);
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.info-panel ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.info-panel li {
  color: #111111;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: clamp(1.35rem, 1.8vw, 1.7rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .hero-copy h1 {
    font-size: clamp(3.1rem, 15vw, 5.4rem);
  }

  .info-board {
    grid-template-columns: 1fr;
  }

  .info-panel {
    border-right: 0;
    border-bottom: 1px solid rgb(17 17 17 / 10%);
  }

  .info-panel--accent {
    border-bottom: 0;
  }
}
</style>