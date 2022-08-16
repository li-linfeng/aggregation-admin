<template>
  <div class="app-container">
    <div class="filter-container">
       <el-select v-model="listQuery.filter_col" placeholder="手机号" clearable class="filter-item" style="width: 130px">
        <el-option key="filter_contact" label="手机号" value="filter_contact" />
        <el-option key="filter_id" label="用户id" value="filter_id" />
      </el-select>
      <el-input v-model="listQuery.filter_val" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        导出excel
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

     <el-table-column label="手机号" align="center" width="110">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邀请码" align="center" width="70">
        <template slot-scope="{row}">
          <span>{{  row.share_code }}</span>
        </template>
      </el-table-column>

      <el-table-column label="父级id" align="center" width="65">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.parent_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="累计无限卡" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{  row.total_account_days }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="累计奖励" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{  row.total_award_days }}</span>
        </template>
      </el-table-column>

      <el-table-column label="无限卡剩余" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{  row.available_days }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订阅源数" align="center" width="80">
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
          <span>{{  row.latest_login_time }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="状态" align="center" width="90">
        <template slot-scope="{row}">
          <el-tag :type="row.is_stop == 1 ? 'danger':'success'">
             {{row.is_stop == 1 ?'停权中': '使用中'}}
          </el-tag>
        </template>
      </el-table-column>
      
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}" >
            <el-button type="primary" size="mini"  @click="showDialog(row)">
              赠送无限卡 
            </el-button>
            <el-button  size="mini" :type="row.is_stop == 1 ? 'success': 'danger'"   @click="switchUserStatus(row)">
                {{row.is_stop == 1 ? '复权': '停权'}}
            </el-button>
        </template> 
     </el-table-column>
  </el-table>

  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :per_page.sync="listQuery.per_page" @pagination="getList" />

   <el-dialog title="赠送无限卡" :visible.sync="dialogVisible"  width="25%">
    <div class="add-time">
      给用户  <span class="user-name">{{ target.nickname}}</span> 
              <span class="user-mobile">{{ target.mobile }}</span>
     赠送无限卡
              <input v-model="addDays" class="day-input"/>天
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addTimeToUser()">
          确认
        </el-button>
    </div>
  </el-dialog>

  </div>
</template>

<script>
import { getUserList, switchStatus, addTime, exportUser} from '@/api/user'
import { downloadBlob } from '@/utils/help'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'UserIndex',
  components: { Pagination },
  data() {
    return {
      list      : null,
      total     : 0,
      downloadLoading:false,
      target : {
        nickname : "",
        mobile: "",
        id: 0,
      },
      addDays : 0,
      dialogVisible: false,
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
    handleDownload(){
      this.downloadLoading = true
      exportUser(this.listQuery).then((res) => {
        const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const name = `用户列表${Date.now()}.xlsx`;
        downloadBlob(res, type, name);
      })
      .finally(() => {
        this.downloadLoading = false
      });   
    },
    showDialog(row){
      this.target = row
      this.dialogVisible = true
    },
    addTimeToUser(){
      var params ={
        "days": this.addDays
      }
      addTime(this.target.id, params).then(res=>{
        this.getList().then(r=>{
          this.$message({
            message: '操作Success',
            type: 'success'
          })
           this.dialogVisible = false
        })
      })
    },
    switchUserStatus(row){
      switchStatus(row.id).then(res=>{
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
    }

    .add-time{
      line-height: 20px;
    }
    .user-name{
      color: #409EFF;
      padding-right: 3px;
    }
    .user-mobile{
      color: #409EFF;
    }
    .day-input{
      line-height: 24px;
      text-align: center;
      width: 12%;
      margin-left: 10px;
      margin-right: 5px;
    }
</style>