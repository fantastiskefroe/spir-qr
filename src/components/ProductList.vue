<template>
  <ul class="list-group">
    <li v-for="product in productList" :key="product.id" class="list-group-item d-flex justify-content-between align-items-center">
      <ProductItem :product="product"></ProductItem>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Product} from "@/types/product";
import ProductItem from "@/components/ProductItem.vue";
import {ProductDTO} from "@/types/productDTO";

export default defineComponent({
  name: 'ProductList',
  components: {ProductItem},

  data() {
    return {
      productList: [] as Product[]
    }
  },
  mounted() {
    this.getAll();
  },
  methods: {
    async getAll(): Promise<void> {
      const maxCacheAge = 5 * 60 * 1000;
      const data = this.loadFromCache();

      if (Date.now() - data.timestamp > maxCacheAge) {
        this.productList = await this.fetchAll();
        this.saveToCache(this.productList);
      } else {
        this.productList = this.loadFromCache().productList;
      }

      console.log(this.productList[0]);
      console.log(this.productList[0].imgUrl);
    },
    async fetchAll(): Promise<Product[]> {
      const data = await fetch('https://products.spir.fantastiskefroe.dk/')
          .then(value => value.json())
          .then((data: ProductDTO[]) => data);

      return Promise.resolve(data.map(this.toProduct));
    },
    toProduct(source: ProductDTO): Product {
      return {
        id: source.id,
        title: source.title,
        url: source.url,
        imgUrl: source.imageUrl
      };
    },
    saveToCache(productList: Product[]): void {
      const data = {
        timestamp: Date.now(),
        productList
      };

      window.localStorage.setItem('productList', JSON.stringify(data));
    },
    loadFromCache(): { timestamp: number, productList: Product[] } {
      const data = window.localStorage.getItem('productList');
      if (data === null) {
        return {
          timestamp: 0,
          productList: []
        };
      }

      return JSON.parse(data);
    }
  }
});
</script>

<style scoped>

</style>