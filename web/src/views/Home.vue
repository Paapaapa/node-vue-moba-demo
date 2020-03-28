<template>
  <div>
    <swiper>
      <!-- slides -->
      <swiper-slide>
        <img src="../assets/images/test1.jpg" class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/test2.png" class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/test3.jpg" class="w-100" />
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1 fs-sm">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="iconfont icon-wangzherongyao"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="mr-2 iconfont icon-shouqi fs-sm"></i>
        <span>收起</span>
      </div>
    </div>

    <m-list-card icon="caidan" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/article/${item._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(item,index) in category.newsList"
          :key="index"
        >
          <span class="text-info">[{{item.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipse pr-2">{{item.title}}</span>
          <span class="text-gray-1 fs-sm">{{item.createAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="yingxiong" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <router-link 
          tag="div"
          :to='`/hero/${item._id}`'
            class="p-2 text-center"
            style="width:20%;"
            v-for="(item,index) in category.heroList"
            :key="index"
          >
            <img :src="item.avatar" :alt="item.name" class="w-100" />
            <div>{{item.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsCats: [
        {
          name: "热门",
          newsList: Array(5).fill({
            categoryName: "公告",
            title: "xxxx",
            data: "06/01"
          })
        },
        {
          name: "新闻",
          newsList: Array(5).fill({
            categoryName: "公告",
            title: "xxxx",
            data: "06/01"
          })
        },
        {
          name: "公告",
          newsList: Array(5).fill({
            categoryName: "公告",
            title: "xxxx",
            data: "06/01"
          })
        },
        {
          name: "活动",
          newsList: Array(5).fill({
            categoryName: "公告",
            title: "xxxx",
            data: "06/01"
          })
        },
        {
          name: "赛事",
          newsList: Array(5).fill({
            categoryName: "公告",
            title: "xxxx",
            data: "06/01"
          })
        }
      ],
      heroCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/var";

.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 0.8;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
    .iconfont {
      font-size: 1.25rem;
    }
  }
}
</style>