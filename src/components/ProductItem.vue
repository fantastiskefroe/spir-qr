<template>
  <img :src="product.imgUrl" alt="">
  <span v-html="product.title"></span>
  <span @click="download(product.url)" class="btn btn-primary">Download</span>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import QRCode from 'qrcode';
import {Product} from "@/types/product";

export default defineComponent({
  name: 'ProductItem',
  props: {
    product: {type: Object as PropType<Product>, required: true}
  },
  methods: {
    qr(inputString: string, width?: number): Promise<string> {
      return QRCode.toString(inputString, {
        type: 'svg',
        errorCorrectionLevel: 'H',
        margin: 0,
        color: {
          dark:"#000000FF",
          light:"#FFFFFF00"
        },
        width
      });
    },
    async download(inputString: string): Promise<void> {
      if (!inputString) {
        return;
      }

      const fileName = this.generateFileName(inputString);
      const objectUrl = this.generateObjectURL(await this.qr(inputString, 45.354));

      // Create and activate link element
      const el = document.createElement('a');
      el.download = fileName;
      el.href = objectUrl;
      el.click();

      // Clean up
      el.remove();
      window.URL.revokeObjectURL(objectUrl);
    },
    generateFileName(inputString: string): string {
      const split = inputString.split('/');

      return split[split.length - 1] + '-qr.svg';
    },
    generateObjectURL(data: string): string {
      return window.URL.createObjectURL(new Blob([data]));
    }
  }
});
</script>

<style scoped>

</style>