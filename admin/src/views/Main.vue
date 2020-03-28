<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="menuIndex" unique-opened :default-active="$route.path">
        <el-submenu index="1" @open="handleMenuChange" @close="handleMenuChange">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/item/create">新建物品</el-menu-item>
            <el-menu-item index="/item/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/hero/create">新建英雄</el-menu-item>
            <el-menu-item index="/hero/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/article/create">新建文章</el-menu-item>
            <el-menu-item index="/article/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" @open="handleMenuChange" @close="handleMenuChange">
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ad/create">新建广告位</el-menu-item>
            <el-menu-item index="/ad/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" @open="handleMenuChange" @close="handleMenuChange">
          <template slot="title">
            <i class="el-icon-message"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/category/create">新建分类</el-menu-item>
            <el-menu-item index="/category/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_user/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleDropdown">
          <i class="el-icon-switch-button" style="margin-right: 15px;cursor:pointer;"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="quit">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{username}}</span>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuIndex: ["1"]
    };
  },
  computed: {
    username() {
      return localStorage.getItem("userName");
    }
  },
  methods: {
    handleMenuChange(index) {
      if (this.menuIndex.includes(index)) {
        this.menuIndex = [];
      } else {
        this.menuIndex = [index];
      }
    },
    handleDropdown(command) {
      console.log(command);
      if (command === "quit") {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>