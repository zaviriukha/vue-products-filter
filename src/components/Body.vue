<template>
  <div class="some-page-wrapper">
    <div class="row-page">
      <div class="column sidebar pt-4">
        <div class="sidebar-title mb-3 d-flex justify-content-start">
          Filter
        </div>
        <vsa-list :auto-collapse="false">
          <vsa-item>
            <vsa-heading>
              Eigenschaften
            </vsa-heading>

            <vsa-icon>
              <span class="open"><i class="fas fa-chevron-down"></i></span>
              <span class="close"><i class="fas fa-chevron-up"></i></span>
            </vsa-icon>

            <vsa-content>
              <div id="specificationFilter" class="filters-checkboxes">
                <div v-for="(specification,index) in specificationFilters" :key="index"
                     class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="specification.checked"
                         v-on:change="getFilteredData">
                  <label class="form-check-label">
                    {{ specification.value }} ({{ specification.count }})
                  </label>
                </div>
              </div>
            </vsa-content>
          </vsa-item>

          <vsa-item>
            <vsa-heading>
              Preis
            </vsa-heading>

            <vsa-icon>
              <span class="open"><i class="fas fa-chevron-down"></i></span>
              <span class="close"><i class="fas fa-chevron-up"></i></span>
            </vsa-icon>

            <vsa-content>
              <div id="priceFilter">
                <form @submit.prevent="getFilteredData">
                  <div class="form-row">
                    <div class="col-5">
                      <p class="mb-0">Min. price</p>
                      <input id="minPriceInput" style="width: 75px;" class="form-control" type="number" step="0.1"
                             v-model="minPrice"/>
                    </div>
                    <div class="col-5">
                      <p class="mb-0">Max. price</p>
                      <input id="maxPriceInput" style="width: 75px;" class="form-control" type="number" step="0.1"
                             v-model="maxPrice"/>
                    </div>
                    <div class="col-2 d-flex justify-content-center">
                      <button type="submit" style="height: 38px" class="btn btn-primary align-self-end">OK</button>
                    </div>
                  </div>
                </form>
              </div>
            </vsa-content>
          </vsa-item>

          <vsa-item>
            <vsa-heading>
              Hersteller
            </vsa-heading>

            <vsa-icon>
              <span class="open"><i class="fas fa-chevron-down"></i></span>
              <span class="close"><i class="fas fa-chevron-up"></i></span>
            </vsa-icon>

            <vsa-content>
              <div id="manufacturerFilter" class="filters-checkboxes">
                <div v-for="(manufacturer,index) in manufacturerFilters" :key="index"
                     class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="manufacturer.checked"
                         v-on:change="getFilteredData">
                  <label class="form-check-label">
                    {{ manufacturer.value }} ({{ manufacturer.count }})
                  </label>
                </div>
              </div>
            </vsa-content>
          </vsa-item>

          <vsa-item>
            <vsa-heading>
              Region
            </vsa-heading>

            <vsa-icon>
              <span class="open"><i class="fas fa-chevron-down"></i></span>
              <span class="close"><i class="fas fa-chevron-up"></i></span>
            </vsa-icon>

            <vsa-content>
              <div id="regionFilter" class="filters-checkboxes">
                <div v-for="(region,index) in regionFilters" :key="index" class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="region.checked"
                         v-on:change="getFilteredData">
                  <label class="form-check-label">
                    {{ region.value }} ({{ region.count }})
                  </label>
                </div>
              </div>
            </vsa-content>
          </vsa-item>
        </vsa-list>
      </div>

      <div class="double-column pt-4">
        <AppTitle title="Ole" sub-title="Lorem ipsum dolor sit amet event landing template" up-title="Warengruppe"/>

        <div class="select-block mb-3 d-flex justify-content-start">
          <b class="pr-3">Order by </b>
          <select v-model="sortType" v-on:change="sortItem()">
            <option value="" disabled>Select order</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div class="row">
          <div v-for="(product, index) in filteredProducts">
            <AppCard :key="index" :item="product"></AppCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsData from "../api/products.json"
import AppCard from "@/components/app/AppCard";
import AppTitle from "@/components/app/AppTitle";
export default {
  name: "Body",
  components: {AppTitle, AppCard},
  data() {
    return {
      regions: [],
      manufacturers: [],
      specifications: [],
      minPrice: 0,
      maxPrice: 0,
      products: productsData,
      filteredProducts: [],
      regionFilters: [],
      manufacturerFilters: [],
      specificationFilters: [],
      sortType: '',
    }
  },
  methods: {
    initFilterData() {
      this.regions = new Map();
      this.manufacturers = new Map();
      this.specifications = new Map();

      this.products.forEach((product) => {
        if (!this.regions.has(product.region)) {
          this.regions.set(product.region, 1);
        } else {
          let val = this.regions.get(product.region);
          this.regions.set(product.region, val + 1);
        }
        //----------------------
        if (!this.manufacturers.has(product.manufacturer)) {
          this.manufacturers.set(product.manufacturer, 1);
        } else {
          let val = this.manufacturers.get(product.manufacturer);
          this.manufacturers.set(product.manufacturer, val + 1);
        }
        //----------------------
        product.properties.forEach((property) => {
          if (!this.specifications.has(property)) {
            this.specifications.set(property, 1);
          } else {
            let val = this.specifications.get(property);
            this.specifications.set(property, val + 1);
          }
        });
        //----------------------
        if (this.minPrice === 0 || this.minPrice > product.price) {
          this.minPrice = product.price;
        }
        if (this.maxPrice === 0 || this.maxPrice < product.price) {
          this.maxPrice = product.price;
        }
      });
    },

    createRegionsFilter() {
      this.regions.forEach((value, key) => {
        if (key.length > 0) {
          let filter =
              {
                checked: false,
                value: key,
                count: value
              }
          this.regionFilters.push(filter);
        }
      });
    },

    createManufacturerFilter() {
      this.manufacturers.forEach((value, key) => {
        if (key.length > 0) {
          let filter =
              {
                checked: false,
                value: key,
                count: value
              }
          this.manufacturerFilters.push(filter);
        }
      });
    },

    createSpecificationsFilter() {
      this.specifications.forEach((value, key) => {
        let filter =
            {
              checked: false,
              value: key,
              count: value
            }
        this.specificationFilters.push(filter);
      });
    },

    getFilteredData() {
      this.filteredProducts = this.products;
      let filteredDataByfilters = [];
      if (this.selectedRegionFilters.length > 0) {
        filteredDataByfilters = this.filteredProducts.filter(obj => this.selectedRegionFilters.every(val => obj.region.indexOf(val) >= 0));
        this.filteredProducts = filteredDataByfilters;
      }
      if (this.selectedSpecificationsFilters.length > 0) {
        filteredDataByfilters = this.filteredProducts.filter(obj => this.selectedSpecificationsFilters.every(val => obj.properties.indexOf(val) >= 0));
        this.filteredProducts = filteredDataByfilters;
      }
      if (this.selectedManufacturersFilters.length > 0) {
        filteredDataByfilters = this.filteredProducts.filter(obj => this.selectedManufacturersFilters.every(val => obj.manufacturer.indexOf(val) >= 0));
        this.filteredProducts = filteredDataByfilters;
      }
      filteredDataByfilters = this.filteredProducts.filter(obj => obj.price >= this.minPrice && obj.price <= this.maxPrice);
      this.filteredProducts = filteredDataByfilters;
    },

    sortItem() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }

      if (this.sortType == 'price') {
        this.filteredProducts = this.filteredProducts.sort((prev, curr) => prev.price - curr.price);
      }
      if (this.sortType == 'name') {
        this.filteredProducts = this.filteredProducts.sort(compare);
      }
    }
  },

  computed: {
    selectedRegionFilters() {
      let filters = [];
      let checkedFilters = this.regionFilters.filter(obj => obj.checked);
      checkedFilters.forEach(element => {
        filters.push(element.value);
      });
      return filters;
    },

    selectedSpecificationsFilters() {
      let filters = [];
      let checkedFilters = this.specificationFilters.filter(obj => obj.checked);
      checkedFilters.forEach(element => {
        filters.push(element.value);
      });
      return filters;
    },

    selectedManufacturersFilters() {
      let filters = [];
      let checkedFilters = this.manufacturerFilters.filter(obj => obj.checked);
      checkedFilters.forEach(element => {
        filters.push(element.value);
      });
      return filters;
    },
  },

  created() {
    this.filteredProducts = this.products;
    this.initFilterData();
    this.createRegionsFilter();
    this.createManufacturerFilter();
    this.createSpecificationsFilter();
  }
}
</script>

<style lang="scss">
.row-page {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
}
.double-column {
  display: flex;
  flex-direction: column;
  width: 70%;
}
.vsa-list {
  border: none !important;
}
.vsa-item {
  .vsa-item__trigger__icon{
    font-size: 12px;
    font-weight: 600;
    font-family: "Athelas";
    line-height: 0.85;
  }

  &--is-active {
    .vsa-item__trigger__icon {
      .open {
        display: none;
      }

      .close {
        display: block;
      }
    }
  }

  &__trigger__icon {
    .open {
      display: block;
    }

    .close {
      display: none;
      font-size: 100% !important;
    }
  }
}

.vsa-item__trigger__content {
  font-weight: 500 !important;
  font-size: 0.85rem !important;
}
.sidebar{
  font-family: "Athelas";

  .sidebar-title {
    font-size: 18px;
    font-weight: 600;
  }
}
.filters-checkboxes {
  display: flex;
  flex-direction: column;
}
.select-block{
  font-size: 14px;
  font-family: "Brown-Pro";
}
.fas{
  font-weight: 600;
}
</style>
