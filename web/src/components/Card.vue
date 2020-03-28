<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center" :class="{'border-bottom':!noMore,'pb-3':!noMore}">
      <i :class="`iconfont icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">
        <strong>{{title}}</strong>
      </div>
      <i class="iconfont icon-caidan1" v-if="!noMore"></i>
    </div>

    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, require: true },
    icon: { type: String, require: true },
    noMore: { type: Boolean }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
