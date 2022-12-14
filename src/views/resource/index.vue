<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.filter_is_show"
                 placeholder="是否在线"
                 class="filter-item"
                 style="width: 130px">
        <el-option key="2"
                   label="全部"
                   value="2" />
        <el-option key="1"
                   label="在线"
                   value="1" />
        <el-option key="0"
                   label="不在线"
                   value="0" />
      </el-select>

      <el-radio-group v-model="listQuery.filter_col">
        <el-radio label="filter_id">按id</el-radio>
        <el-radio label="filter_name">按源名</el-radio>
        <el-radio label="filter_website">按链接</el-radio>
      </el-radio-group>

      <el-input v-model="listQuery.filter_val"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />

      <el-date-picker v-model="listQuery.filter_date"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item"
                 type="primary"
                 icon="el-icon-search"
                 @click="handleFilter">
        搜索
      </el-button>
      <el-button :loading="downloadLoading"
                 style="margin:0 0 20px 20px;"
                 type="primary"
                 icon="el-icon-document"
                 @click="handleDownload">
        导出excel
      </el-button>
    </div>
    <el-table :data="list"
              border
              highlight-current-row
              style="width: 100%; max-width: 1660px;">
      <el-table-column label="源编号"
                       prop="id"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="icon"
                       align="center"
                       width="150">
        <template slot-scope="{row}">
          <el-avatar shape="square"
                     :size="100"
                     :src="row.icon_url"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column label="名称"
                       align="center"
                       width="150">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地址"
                       align="center"
                       width="200">
        <template slot-scope="{row}">
          <span>{{  row.website }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述"
                       align="center"
                       width="390">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属分类"
                       align="center"
                       width="140">
        <template slot-scope="{row}">
          <div v-for="(tags, tagsIndex) in row.topics"
               :key="tagsIndex">
            <el-tag type="success">
              {{tags}}
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="订阅人数"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{  row.collections_count }}</span>
        </template>
      </el-table-column>

      <el-table-column label="浏览数"
                       align="center"
                       width="70">
        <template slot-scope="{row}">
          <span>{{  row.browse_articles_count }}</span>
        </template>
      </el-table-column>

      <el-table-column label="收藏数"
                       align="center"
                       width="70">
        <template slot-scope="{row}">
          <span>{{  row.collect_articles_count }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提交人"
                       align="center"
                       width="70">
        <template slot-scope="{row}">
          <span>{{  row.user_id >0 ? row.user_id :"管理员" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提交日期"
                       align="center"
                       width="170">
        <template slot-scope="{row}">
          <span>{{  row.updated_at  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="公开状态"
                       align="center"
                       width="80"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-switch :value="row.is_show >0"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="updateStatus(row)">
          </el-switch>
        </template>
      </el-table-column>

      <!-- <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="danger"
                     @click="deleteResource(row)">
            删除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :per_page.sync="listQuery.per_page"
                @pagination="getList" />

  </div>
</template>

<script>
import { getResourceList, switchStatus } from '@/api/resource'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ResourceIndex',
  components: { Pagination },
  data () {
    return {
      list: null,
      total: 0,
      dialogVisible: false,
      downloadLoading: false,
      listQuery: {
        page: 1,
        per_page: 10,
        filter_is_show: "2",
        filter_val: "",
        filter_col: "filter_id",
        filter_date: null,
      },
    }
  },
  created () {
    this.getList()
  },
  methods: {
    isShow (row) {
      return row.is_show > 0
    },
    getList () {
      return getResourceList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.meta.pagination.total
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload () {
      this.downloadLoading = true
      exportResource(this.listQuery).then((res) => {
        const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const name = `资源列表${Date.now()}.xlsx`;
        downloadBlob(res, type, name);
      })
        .finally(() => {
          this.downloadLoading = false
        });
    },
    updateStatus (row) {
      switchStatus(row.id).then(res => {
        this.getList()
      })
    }
  }
}
</script>

<style>
.filter-container {
  margin-bottom: 20px;
}

.filter-item {
  margin-right: 15px;
  margin-left: 5px;
}

.add-time {
  line-height: 20px;
}
.user-name {
  color: #409eff;
  padding-right: 3px;
}
.user-mobile {
  color: #409eff;
}
.day-input {
  line-height: 24px;
  text-align: center;
  width: 12%;
  margin-left: 10px;
  margin-right: 5px;
}
</style>