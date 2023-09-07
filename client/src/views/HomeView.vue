<script setup>
import TheHeader from '../components/TheHeader.vue';
import TheSidebar from '../components/TheSidebar.vue';
import AddLinkSection from '../components/AddLinkSection.vue';
</script>

<template>
  <div class="wrapper">
    <TheHeader></TheHeader>

    <div class="main">
      <TheSidebar></TheSidebar>
      <AddLinkSection></AddLinkSection>
    </div>
  </div>
</template>
<style>
.main{
  display: flex;
}
</style>