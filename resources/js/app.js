import './bootstrap';
import Vue from 'vue';
import Vuex from 'vuex';
import MastermindStore from './store/Mastermind';
import Mastermind from './components/Mastermind';

Vue.use(Vuex);

new Vue({
  el: '#app',
  store: MastermindStore,
  render: (h) => h(Mastermind),
});
