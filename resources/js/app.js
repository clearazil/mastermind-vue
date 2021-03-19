import './bootstrap';
import Vue from 'vue';
import Mastermind from './components/Mastermind';

console.log(Mastermind);

new Vue({
  el: '#app',
  render: (h) => h(Mastermind),
});
