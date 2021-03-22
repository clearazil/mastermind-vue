import './bootstrap';
import Vue from 'vue';
import Mastermind from './components/Mastermind';

new Vue({
  el: '#app',
  render: (h) => h(Mastermind),
});
