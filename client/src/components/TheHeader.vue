<script setup>
  import { ref } from 'vue';
  const isLinksTab = ref(false);

  // Function to toggle the state
  const toggleTab = (tab) => {
   tab ? isLinksTab.value = true : isLinksTab.value = false
  };
</script>

<template>
 <header class="header-wrapper">
  <div class="logo">
      <img src="../assets/images/logo-devlinks-large.svg" alt="">
  </div>
  <div class="nav-links cursor-pointer">
    <div class="nav-links__first" :class="{'nav-link__active': isLinksTab}"
      @click="toggleTab(true)"
    >
      <img src="../assets/images/icon-links-header.svg" alt="">
      <span>Links</span>
    </div>
    <div class="nav-links__second" :class="{'nav-link__active': !isLinksTab}"
    @click="toggleTab(false)"
    >
      <img src="../assets/images/icon-profile-details-header.svg" alt="">
      <span>Profile Details</span>
    </div>
  </div>
  <div class="preview">
    <button class="preview__btn cursor-pointer">Preview</button>
  </div>
 </header>
</template>

<style scoped>
.header-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
  background-color: var(--pure-white);
}
.preview__btn{
  background-color: var(--pure-white);
    border: 1px solid var(--blue);
    padding: 10px 20px;
    border-radius: 7px;
    color: var(--blue);
    font-weight: 800;
}
.nav-links{
  display: flex;
    gap: 1rem;
    font-weight: 800;

}
.nav-links__first, .nav-links__second{
  display: flex;
    align-items: center;
    padding: 10px 20px;
    gap: 5px;
    border-radius: 8px;
}
.nav-link__active{
  background: var(--lilac-gray);
  color: var(--blue);
}
</style>
