import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router';
import { routes } from './router/routes';
import { index } from './components/index';
import { Form, HasError, AlertError } from 'vform';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import Loading from 'vue-loading-overlay';
import VuePagination from "./components/common/PaginationComponent";

window.Form = Form

const snotifyOptions = {
  toast: {
    position: SnotifyPosition.rightBottom
  }
}

Vue.use(Snotify, snotifyOptions)
// Router
Vue.use(VueRouter);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.use(Loading);
Vue.component('v-pagination', VuePagination);

const router = new VueRouter({
    routes,
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
