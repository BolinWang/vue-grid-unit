<template>
  <div class="example_demo">
    <div class="layout_pageHeader">
      <el-form
        :inline="true"
        :model="formOptions"
        size="small">
        <el-form-item label="审批人">
          <el-input
            v-model="formOptions.user"
            placeholder="审批人"/>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select
            v-model="formOptions.region"
            placeholder="活动区域">
            <el-option
              label="区域一"
              value="上海"/>
            <el-option
              label="区域二"
              value="北京"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="getMultipleSelectionAll">获取已选数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="layout-container">
      <GridUnit
        ref="refGridUnit"
        :columns="colModels"
        :url="url"
        :data-method="method"
        :is-mock="isMock"
        :form-options="formOptions"
        :show-expand="true"
        :show-selection="true"
        :selection-key="`exampleId`">
        <template
          slot="expandForm"
          slot-scope="table_scope">
          <el-form
            label-position="left"
            inline>
            <el-form-item
              v-for="(item, index) in expandColums"
              :label="item.label"
              :key="index">
              <span>{{ item.prop }}</span>
            </el-form-item>
          </el-form>
        </template>
        <template
          slot="handle"
          slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-view"
            size="small"
            @click="handleView(scope.$index)">
            再来一个表格吧
          </el-button>
        </template>
      </GridUnit>
    </div>
    <div class="dialog_example">
      <el-dialog
        :visible.sync="layer_show"
        title="你知道的  这是第二个表格"
        width="100%"
        style="text-align: center;">
        <GridUnit
          ref="refGridUnit_view"
          :columns="colModels_view"
          :url="url"
          :data-method="method"
          :is-mock="isMock"
          height="300px" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import GridUnit from './lib/grid'
import { fetch } from './utils/fetch'
const exampleApi = {
  requestPath: 'example/list',
  isMock: true,
  queryActivityListByPage (params = {}) {
    return fetch(this.requestPath, {
      params
    }, {
      isMock: this.isMock
    })
  }
}

export default {
  name: 'app',
  components: {
    GridUnit
  },
  filters: {

  },
  data () {
    return {
      layer_show: false,
      tableHeight: 300,
      formOptions: {
        user: '',
        region: ''
      },
      colModels: [
        {
          prop: 'activityStatus',
          label: '状态',
          width: 80,
          type: 'status',
          unitFilters: {
            renderStatusType (status) {
              const statusMap = {
                '1': 'info',
                '2': 'success',
                '3': 'danger'
              }
              return statusMap[status] || 'success'
            },
            renderStatusValue (status) {
              const statusStrData = ['待上线', '已上线', '已下线']
              return statusStrData[status - 1] || '已上线'
            }
          }
        },
        {prop: 'title', label: '标题'},
        {prop: 'linkUrl', label: '链接', type: 'link'},
        {prop: 'introduction', label: '简介'},
        {label: '操作', slotName: 'handle', width: 160}
      ],
      colModels_view: [
        {prop: 'title', label: '标题'}
      ],
      expandColums: [
        {prop: 'title', label: '标题'},
        {prop: 'introduction', label: '简介'}
      ],
      url: exampleApi.requestPath,
      method: exampleApi.queryMethod,
      isMock: exampleApi.isMock
    }
  },
  computed: {

  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  methods: {
    handleView (index) {
      this.$message.success('柏林爸爸' + index)
      this.layer_show = true
    },
    handleSearch () {
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    getMultipleSelectionAll () {
      const multipleSelectionAll = this.$refs.refGridUnit.multipleSelectionAll
      this.$message({
        showClose: true,
        message: `已选择${multipleSelectionAll.length}条数据`
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.example_demo {
  padding: 20px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
