import {createApp} from 'vue'
import * as Sentry from "@sentry/vue";
import App from "@/App.vue";

const app = createApp(App);

const dsn = 'https://bd84d092c35549a28d0470b3be99868b@o1249239.ingest.sentry.io/6409646';
const release = process.env.VUE_APP_SENTRY_RELEASE;
const options: Record<string, string | number> = {
    dsn,
    release,
    tracesSampleRate: 1.0,
};

if (release === 'dev') {
    options['environment'] = 'dev';
}

Sentry.init(options);

app.mount('#app')
