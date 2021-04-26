<template >
  <div class="col">
    <button
        :disabled="!isRowActive(rowNumber)"
        class="code-circle" :class="colorClass({buttonNumber, rowNumber})"
        aria-expanded="false"
        data-bs-offset="0,0"
        @click="showColorOptionsToggle">
    </button>
    <div v-if="showColorDropDown" class="outside" @click="away"></div>
    <ul
      class="dropdown-menu code-dropdown show"
      aria-labelledby="dropdownMenuOffset"
      v-if="showColorDropDown"
    >
      <li v-for="n in 6" :key="n">
        <button class="code-circle" :class="'color-' + n" @click="pickColorButton(n)">
          <a class="dropdown-item" href="#"></a>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  props: ['buttonNumber', 'rowNumber'],
  data() {
    return {
      showColorDropDown: false,
    };
  },
  computed: {
    ...mapGetters([
      'isRowActive',
      'colorClass',
    ]),
  },
  methods: {
    showColorOptionsToggle() {
      if (this.showColorDropDown) {
        this.showColorDropDown = false;
      } else {
        this.showColorDropDown = true;
      }
    },
    pickColorButton(colorNumber) {
      this.showColorDropDown = false;
      this.pickColor({
        colorNumber,
        buttonNumber: this.buttonNumber,
      });
    },
    away() {
      this.showColorDropDown = false;
    },
    ...mapMutations([
      'pickColor',
    ]),
  },
};
</script>
