<template>
  <div>
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告">
        <el-button @click="model.items.push({})" plain style="width:100%;margin-bottom:1rem">
          <i class="el-icon-plus"></i>
          添加广告
        </el-button>
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item,index) in model.items" :key="index">
            <el-divider>
              第 {{index+1}} 顺位
              <el-tooltip effect="dark" content="删除" placement="right">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="mini"
                  @click="model.items.splice(index,1)"
                ></el-button>
              </el-tooltip>
            </el-divider>

            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res=>afterSkillUpload(res,item)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.go(-1)" v-if="id">取消</el-button>
      </el-form-item>
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
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/ads/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/ads", this.model);
      }
      this.$router.push("/ad/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model = {
        ...this.model,
        ...res.data
      };
    },
    async afterSkillUpload(res, item) {
      this.$set(item, "image", res.url);
    }
  },
  created() {
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