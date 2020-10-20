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

<style scoped lang="scss">
.title-block {
  display: flex;
  text-align: center;
  flex-direction: column;

.up-title {
  font-size: 20px;
  font-family: "Athelas";
}

.products-title {
  font-size: 35px;
  font-family: "Brown-Pro";
}

.products-subtitle {
  font-size: 18px;
  font-family: "Brown-Pro";
}
}
</style>
