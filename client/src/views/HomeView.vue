<script setup>
import TheHeader from '../components/TheHeader.vue';
import TheSidebar from '../components/TheSidebar.vue';
import AddLinkSection from '../components/AddLinkSection.vue';
</script>

<template>
  <div class="wrapper">
    <TheHeader />

    <div class="main">
      <TheSidebar class="sidebar" />
      <AddLinkSection class="add-link-section" />
    </div>
  </div>
</template>
<style scoped>
.main{
  display: flex;
}
/* Style the sidebar */
.sidebar {
    width: 40%;
    background-color: #f0f0f0;
    padding: 20px;
}

/* Style the content */
.add-link-section {
    flex: 1; /* Allow content to grow and fill remaining space */
    padding: 20px;
}
</style>