<template >
  <div class="col">
    <button
        :disabled="!isCurrentRow"
        class="code-circle" :class="colorClass"
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
      <li v-for="n in 6" v-bind:key="n">
        <button class="code-circle" :class="'color-' + (n - 1)" @click="pickColorButton(n - 1)">
          <a class="dropdown-item" href="#"></a>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showColorDropDown: false,
      colorClass: 'color-neutral',
    };
  },
  props: ['isCurrentRow', 'buttonNumber'],
  methods: {
    showColorOptionsToggle() {
      if (this.showColorDropDown) {
        this.showColorDropDown = false;
      } else {
        this.showColorDropDown = true;
      }
    },
    pickColorButton(number) {
      this.colorClass = 'color-' + number;
      this.$emit('on-color-chosen', {buttonNumber: this.buttonNumber, colorNumber: number});
      this.showColorDropDown = false;
    },
    away() {
      this.showColorDropDown = false;
    },
  },
};
</script>
