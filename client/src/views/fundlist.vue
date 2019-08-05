<template>
  <div class="fundlist">
    <!-- 操作区 -->
    <div class="opera-warp">
      <el-button @click="dialogFormVisible=true;dialogType=0;form={}">添加数据</el-button>
    </div>
    <!-- dialog -->
    <el-dialog :title="!dialogType?'添加数据':'修改数据'" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收支类型" :label-width="labelWIdth">
          <el-select v-model="form.type" placeholder="请选择收支类型">
            <el-option label="优惠券1" value="优惠券1"></el-option>
            <el-option label="优惠券2" value="优惠券2"></el-option>
            <el-option label="优惠券3" value="优惠券3"></el-option>
            <el-option label="优惠券4" value="优惠券4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述" :label-width="labelWIdth">
          <el-input v-model="form.describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收入" :label-width="labelWIdth">
          <el-input v-model="form.income" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出" :label-width="labelWIdth">
          <el-input v-model="form.expend" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户现金" :label-width="labelWIdth">
          <el-input v-model="form.cash" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="labelWIdth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialog">{{ !dialogType?'确 定':'修改' }}</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <div class="tab-wrap">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column label="创建时间" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span
              style="margin-left: 10px"
            >{{ dateFormat(new Date((scope.row.createTime)-0),'-:') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型"></el-table-column>
        <el-table-column prop="describe" label="收支描述"></el-table-column>
        <el-table-column prop="income" label="收入"></el-table-column>
        <el-table-column prop="expend" label="支出"></el-table-column>
        <el-table-column prop="cash" label="账户现金"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editRow(scope.$index, tableData)"
              type="parmary"
              size="small"
            >编辑</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="danger"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[2, 5, 10, 100, 200, 300, 400]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import { dateFormat } from "../common/js/tools";
export default {
  data() {
    return {
      allTableData: [],
      tableData: [],
      //   对话框
      labelWIdth: "100px",
      dialogFormVisible: false,
      dialogType: 0,
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      },
      editId: 0,
      //   页码
      pagination: {
        currentPage: 0,
        pageSize: 0,
        total: 0
      }
    };
  },
  methods: {
    // 编辑某一
    editRow(index, rows) {
      let data = rows[index];
      this.dialogType = 1;
      this.dialogFormVisible = true;
      //     数据赋值
      this.form.type = data.type;
      this.form.describe = data.describe;
      this.form.income = data.income;
      this.form.expend = data.expend;
      this.form.cash = data.cash;
      this.form.remark = data.remark;
      //   id
      this.editId = data.id;
    },
    // 移除某一
    deleteRow(index, rows) {
      console.log(index, rows);
      // 数据库操作
      this.$axios
        .get(`/api/profiles/delete/${rows[index]["id"]}`)
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            Notification.success(res.data.msg);
            rows.splice(index, 1);
            this.getData_list();
          } else {
            Notification.success("移除数据失败", err);
          }
        })
        .catch(err => {
          Notification.success("deleteRow 发生未知错误");
        });
    },
    // 获取数据
    getData_list() {
      this.$axios
        .get("/api/profiles")
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.allTableData = res.data.data;
            // 设置分页数据
            this.setPaginations();
          }
        })
        .catch(err => {
          console.log(err);
          Notification.error("请求出错！");
        });
    },
    // 分页数据设置
    setPaginations() {
      this.pagination.currentPage = 1;
      this.pagination.pageSize = 10;
      this.pagination.total = this.allTableData.length;
      //   设置展示数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagination.pageSize;
      });
    },
    // 时间格式化
    dateFormat(date, geshi) {
      return dateFormat(date, geshi);
    },
    // 提交dialog
    submitDialog() {
      if (this.dialogType == 0) {
        //  添加数据
        let formData = this.form;
        this.$axios({
          method: "post",
          url: "/api/profiles/add",
          data: formData
        })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              Notification.success(res.data.msg);
              this.getData_list();
            }
          })
          .catch(err => {
            Notification.error("发生未知错误：", err);
          });
      } else if (this.dialogType == 1) {
        //  修改数据
        let formData = this.form,
          eId = this.editId;
        this.$axios({
          method: "post",
          url: `/api/profiles/edit/${eId}`,
          data: formData
        })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              Notification.success(res.data.msg);
              this.editId = 0;
              this.getData_list();
            }
          })
          .catch(err => {
            Notification.error("发生未知错误：", err);
          });
      }
      this.dialogFormVisible = false;
    },
    // 每页展示变化函数
    handleSizeChange(val) {
      this.pagination.currentPage = 1;
      this.pagination.pageSize = val;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < val;
      });
    },
    //  页码修改变化函数
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.tableData = this.allTableData.filter((item, index) => {
        return (
          index >=
            (this.pagination.currentPage - 1) * this.pagination.pageSize &&
          index < this.pagination.currentPage * this.pagination.pageSize
        );
      });

      /* //   获取当前页索引
      let index = this.pagination.pageSize * (page - 1);
      //   数据总数
      let nums = this.pagination.pageSize * page;
      //    容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
      }
      this.tableData = tables; */
    }
  },
  created() {
    this.getData_list();
  }
};
</script>

<style lang='stylus' scoped>
.fundlist {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .tab-wrap {
    margin: 10px auto;
    width: 98%;
  }

  .opera-warp {
    padding: 10px;
  }

  .pagination-wrap {
    text-align: right;
    padding-right: 20px;
  }
}
</style>
