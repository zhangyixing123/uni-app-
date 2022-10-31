import App from './App';

// #ifndef VUE3
import Vue from 'vue';
import store from './store';



import uView from '@/uni_modules/uview-ui';
Vue.use(uView);

// const script = document.createElement('script');
//     script.src = '//eruda.liriliri.io/eruda.min.js';
//     document.body.appendChild(script);
//     script.onload = () => window.eruda.init();
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
  ...App,
  store
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp () {
  const app = createSSRApp(App);
  return {
    app
  };
}
// #endif