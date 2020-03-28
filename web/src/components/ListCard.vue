<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{active:activeIndex===index}"
        v-for="(item,index) in categories"
        :key="index"
        @click="$refs.list.swiper.slideTo(index)"
      >
        <div class="nav-link">{{item.name}}</div>
      </div>
    </div>

    <swiper ref="list" 
    :options="{autoHeight:true}"
    @slide-change="()=>activeIndex=$refs.list.swiper.realIndex">
      <swiper-slide v-for="(item,index) in categories" :key="index">
        <slot name="items" :category="item"></slot>
      </swiper-slide>
    </swiper>
  </m-card>
</template>

<script>
export default {
  props: {
    categories: { type: Array, require: true },
    icon: { type: String, require: true },
    title: { type: String, require: true }
  },
  data() {
    return {
      activeIndex: 0
    };
  }
};
</script>

<style lang="scss">
</style>