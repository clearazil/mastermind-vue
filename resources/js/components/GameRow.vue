<template>
  <div class="d-flex justify-content-center pt-2">
    <div class="card game-card">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col" v-for="n in 4" v-bind:key="n">
              <button
                  :disabled="!isCurrentRow"
                  class="code-circle color-neutral"
                  id="dropdownMenuOffset"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-offset="0,0">
              </button>
              <ul
                class="dropdown-menu code-dropdown"
                aria-labelledby="dropdownMenuOffset"
              >
                <li v-for="n in 6" v-bind:key="n">
                  <button class="code-circle" :class="'color-' + (n - 1)">
                    <a class="dropdown-item" href="#"></a>
                  </button>
                </li>
              </ul>
            </div>
            <div class="col">
              <div class="row">
                <div class="col">
                  <span class="code-peg color-neutral"></span>
                </div>
                <div class="col">
                  <span class="code-peg color-neutral"></span>
                </div>
              </div>
              <div class="row">
                <div class="col pt-1">
                  <span class="code-peg color-neutral"></span>
                </div>
                <div class="col pt-1">
                  <span class="code-peg color-neutral"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['number', 'isCurrentRow'],
};
</script>
