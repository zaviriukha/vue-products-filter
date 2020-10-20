<template>
  <div class="col-auto">
    <div class="card px-2 pt-2 pb-4 mb-4" style="">
      <div class="text-center">
        <img class="img-fluid" :src="item.image" width="150" height="100" alt="Card image cap">
        <div class="card-body px-0">
          <div class="card-title mb-0">{{ item.name }}</div>
        </div>
        <div>
          <div class="card-price mb-3">{{ item.priceFormatted }}</div>
          <div class="base-price">{{ item.basePrice.price }} / {{ item.basePrice.unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppCard",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  filters: {
    capitalize: item => {
      return item.toUpperCase();
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 290px;
  max-height: 280px;

  .card-title {
    font-size: 16px;
    line-height: 16px;
    font-family: "Athelas";
  }

  .card-price {
    font-size: 16px;
    line-height: 12px;
    font-family: "Brown-Pro";
  }

  .base-price {
    font-size: 14px;
    line-height: 10px;
    font-family: "Brown-Pro";
  }
</style>
