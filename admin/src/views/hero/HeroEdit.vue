<template>
  <div>
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs v-model="tabKey" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="basic-info">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" placeholder="请选择" multiple>
              <el-option
                v-for="item in categorySd"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res=>afterUpload(res,'banner')"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res=>afterUpload(res,'avatar')"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top:0.6rem;"
              :max="10"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem;" :max="10" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.6rem;" :max="10" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.6rem;" :max="10" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" placeholder="请选择" multiple>
              <el-option
                v-for="item in itemSd"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" placeholder="请选择" multiple>
              <el-option
                v-for="item in itemSd"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" :rows="2" placeholder="请输入" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" :rows="2" placeholder="请输入" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" :rows="2" placeholder="请输入" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能" name="skill">
          <el-button @click="model.skills.push({})" plain style="width:100%;margin-bottom:1rem">
            <i class="el-icon-plus"></i>
            添加技能
          </el-button>
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item,index) in model.skills" :key="index">
              <el-divider>
                第 {{index+1}} 顺位
                <el-tooltip effect="dark" content="删除" placement="right">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="mini"
                    @click="model.skills.splice(index,1)"
                  ></el-button>
                </el-tooltip>
              </el-divider>
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res=>afterSkillUpload(res,item)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳搭档" name="partners">
          <el-button @click="model.partners.push({})" plain style="width:100%;margin-bottom:1rem">
            <i class="el-icon-plus"></i>
            添加搭档
          </el-button>
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item,index) in model.partners" :key="index">
              <el-divider>
                第 {{index+1}} 顺位
                <el-tooltip effect="dark" content="删除" placement="right">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="mini"
                    @click="model.partners.splice(index,1)"
                  ></el-button>
                </el-tooltip>
              </el-divider>
              <el-form-item label="名称">
                <el-select v-model="item.hero" placeholder="请选择">
                  <el-option
                    v-for="item in heroSd"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-row type="flex" justify="center" style="margin-top:1rem">
        <el-form-item label-width="auto">
          <el-button type="primary" native-type="submit">保存</el-button>
          <el-button @click="$router.go(-1)" v-if="id">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      tabKey: "basic-info",
      model: {
        name: "",
        avatar: "",
        banner: "",
        categories: [],
        scores: {
          difficult: 0
        },
        skills: [],
        partners: []
      },
      categorySd: [],
      itemSd: [],
      heroSd:[],
    };
  },
  methods: {
    handleClick(tab) {
      this.tabKey = tab.name;
    },
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/heroes/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/heroes", this.model);
      }
      this.$router.push("/hero/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      //若scores中的所有字段没有值，
      //则返回数据不含scores,会覆盖model,scores中属性取不到值，会报错
      // this.model = res.data;
      this.model = {
        ...this.model,
        ...res.data
      };
    },
    async fetchCategorySd() {
      const res = await this.$http.get(`/rest/categories/`);
      this.categorySd = res.data;
    },
     async fetchHeroSd() {
      const res = await this.$http.get(`/rest/heroes/`);
      this.heroSd = res.data;
    },
    async fetchItemSd() {
      const res = await this.$http.get(`/rest/items/`);
      this.itemSd = res.data;
    },
    async afterUpload(res, type) {
      this.model[type] = res.url;
    },
    async afterSkillUpload(res, item) {
      this.$set(item, "icon", res.url);
    }
  },
  created() {
    this.fetchCategorySd();
    this.fetchItemSd();
    this.fetchHeroSd();
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>