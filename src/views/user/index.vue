<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.filter_val" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.filter_col" placeholder="手机号" clearable class="filter-item" style="width: 130px">
        <el-option key="filter_col" label="手机号" value="filter_contact" />
        <el-option key="filter_col" label="用户id" value="filter_id" />
      </el-select>
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
  <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; max-width: 1660px;"
  >
     <el-table-column label="用户编号" prop="id"  align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>

     <el-table-column label="用户昵称" align="center" width="80">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.nickname }}</span>
        </template>
      </el-table-column>

     <el-table-column label="手机号" align="center" width="120">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邀请码" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{  row.share_code }}</span>
        </template>
      </el-table-column>

      <el-table-column label="父级id" align="center" width="100">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.parent_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="累计无限卡" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{  row.total_account_days }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="累计奖励" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{  row.total_award_days }}</span>
        </template>
      </el-table-column>

      <el-table-column label="无限卡剩余" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{  row.available_days }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订阅源数" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{  row.resources_count }}</span>
        </template>
      </el-table-column>

      <el-table-column label="收藏夹个数" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{  row.collections_count  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="已读数" align="center" width="70">
        <template slot-scope="{row}">
          <span>{{  row.browses_count  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="收藏数" align="center" width="70">
        <template slot-scope="{row}">
          <span>{{  row.collect_articles_count  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="注册日期" align="center" width="170">
        <template slot-scope="{row}">
          <span>{{  row.reg_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最后登录日期" align="center" width="170">
        <template slot-scope="{row}">
          <span>{{  row.last_login_time }}</span>
        </template>
      </el-table-column>
      
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}" >
            <el-button type="primary" size="mini"  @click="deleteData(row, 'cancel')">
              赠送无限卡 
            </el-button>
            <el-button v-if="row.is_stop == 0" size="mini" type="error"   @click="deleteData(row,'finish')">
                停权
            </el-button>
        </template> 
     </el-table-column>
  </el-table>

  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :per_page.sync="listQuery.per_page" @pagination="getList" />

  </div>
</template>

<script>
import { getUserList} from '@/api/user'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'UserIndex',
  components: { Pagination },
  data() {
    return {
      list      : null,
      total     : 0,
      listQuery: {
        page: 1,
        per_page: 10,
        filter_val:"",
        filter_col:""
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return getUserList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.meta.pagination.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    deleteData(row){

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
    }

    .description {
        font-size: 16px;
    }
</style>