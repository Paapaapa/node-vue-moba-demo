<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <i class="iconfont icon-back text-blue"></i>
      <strong class="flex-1 text-blue fs-lg">{{model.title}}</strong>
      <div class="text-gray fs-sm">{{model.createAt | date}}</div>
    </div>

    <div v-html="model.body" class="px-3 body fs-lg"></div>

    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-link"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="py-2">
        <router-link
          class="py-1 px-1"
          tag="div"
          v-for="item in model.related"
          :key="item._id"
          :to="`/article/${item._id}`"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      require: true
    }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id: "fetch"
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
.page-article {
  .body {
    h1 {
      line-height: 2.5rem;
    }
    p {
      line-height: 1.5rem;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>