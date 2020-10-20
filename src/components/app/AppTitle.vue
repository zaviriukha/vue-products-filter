<template>
  <div class="pb-4 title-block">
    <div class="mb-3 up-title">{{ upTitle }}</div>
    <div class="mb-3 products-title">{{ title }}</div>
    <div class="products-subtitle">{{ subTitle }}</div>
  </div>
</template>

<script>
export default {
  name: "AppTitle",
  props: {
    upTitle: {
      type: String
    },
    title: {
      type: String
    },
    subTitle: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
