<template>
    <el-row  type="flex">
        <el-col  :span="3">
            <el-card shadow="always">
                <div> 用户</div>
                注册用户数 {{user_count}}
            </el-card>
        </el-col>  

        <el-col :span="3">
            <el-card shadow="always">
                <div> 订阅源</div>
                源总数 {{resource_count}}
                公开源 {{public_resource_count}}
                私人源 {{private_resource_count}}
            </el-card>
        </el-col>   
        <el-col :span="3">
             <el-card shadow="always">
                <div> 反馈</div>
                反馈总数 {{feedback_count}}
            </el-card>
        </el-col>
             
    </el-row>
</template>

<script>
import { adminHomepage} from '@/api/index'
export default {
  name: 'Index',
  data() {
    return {
      user_count            : 0,
      resource_count        : 0,
      public_resource_count : 0,
      private_resource_count: 0,
      feedback_count        : 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return adminHomepage().then(response => {
        this.user_count             = response.user_count
        this.resource_count         = response.resource_count
        this.public_resource_count  = response.public_resource_count,
        this.private_resource_count = response.private_resource_count
        this.feedback_count         = response.feedback_count
      })
    },
   }
}
</script>
<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin: 10px 20px;
  }
</style>