<template>
  <h1>QR kode</h1>
  <input autofocus v-model.trim="inputString">
  <div v-if="inputString">
    <button @click="clear()">Ryd</button>
    <a :download="generateFileName(inputString)" :href="objectUrl">Download</a>
  </div>
  <div id="qr-output" v-html="outputQr"></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import QRCode from 'qrcode'

export default defineComponent({
  name: 'App',
  data() {
    return {
      inputString: '' as string,
      outputQr: '' as string,
      objectUrl: '' as string
    }
  },
  watch: {
    async inputString(newString) {
      if (newString.length <= 0) {
        return;
      }

      this.outputQr = await this.qr(newString);

      window.URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = this.generateObjectURL(this.outputQr);
    }
  },
  methods: {
    clear(): void {
      this.inputString = '';
    },
    qr(inputString: string): Promise<string> {
      return QRCode.toString(inputString);
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  width: 768px;
}

#qr-output {
  width: 250px;
  margin: auto;
}

</style>
