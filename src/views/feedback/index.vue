<template>
  <div class="app-container">
    <div class="filter-container">
      <el-radio-group v-model="listQuery.filter_col">
        <el-radio label="filter_user_id">按用户id</el-radio>
        <el-radio label="filter_user_mobile">按用户手机号</el-radio>
      </el-radio-group>
      <el-input v-model="listQuery.filter_val" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
  <el-table
      :data="list"
      border
      highlight-current-row
      style="width: 100%; max-width: 1660px;"
  >
     <el-table-column label="反馈编号" prop="id"  align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>
     <el-table-column label="用户id" align="center" width="150">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.user.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户昵称" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{  row.user.nickname  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户手机号" align="center" width="300">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.user.mobile  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="反馈内容" align="center" width="300">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.content  }}</span>
        </template>
      </el-table-column>
     
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}" >
            <el-button  size="mini" type="danger"   @click="del(row)">
              删除
            </el-button>
        </template> 
     </el-table-column>
  </el-table>

  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :per_page.sync="listQuery.per_page" @pagination="getList" />
  </div>
</template>

<script>
import { getFeedbackList, deleteFeedback} from '@/api/feedback'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'FeedbackIndex',
  components: { Pagination },
  data() {
    return {
      list      : null,
      total     : 0,
      listQuery: {
        page: 1,
        per_page: 10,
        filter_val:"",
        filter_col:"filter_user_id",
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return getFeedbackList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.meta.pagination.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    del(row){
      deleteFeedback(row.id).then(res =>{
          this.getList().then(r=>{
            this.$message({
                message: '操作Success',
                type: 'success'
             })
          })
       })
    }
  }
}
</script>

<style>
    .filter-container{
        margin-bottom: 20px;
    }

    
   .filter-item {
        margin-right: 15px;
        margin-left: 10px;
    }
</style>