import {createApp} from 'vue'
import * as Sentry from '@sentry/vue';
import App from '@/App.vue';
import {BrowserTracing} from '@sentry/tracing';
import 'bootstrap';

const app = createApp(App);

const dsn = 'https://bd84d092c35549a28d0470b3be99868b@o1249239.ingest.sentry.io/6409646';
const options: Record<string, string | number> = {
    dsn,
    tracesSampleRate: 1.0,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    integrations: [new BrowserTracing],
};

const release = process.env.VUE_APP_SENTRY_RELEASE;
if (release === 'dev') {
    options['release'] = 'dev';
    options['environment'] = 'dev';
}

if (release !== undefined) {
    Sentry.init(options);
}

app.mount('#app')
