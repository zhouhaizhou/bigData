<template>
    <div>
        <!--编辑界面-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

                <el-form-item label="问卷内容">
                    <el-input type="textarea" placeholder="请输入调查问卷记录，注意：换行输入每条记录" :rows="8" v-model="editForm.question"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.startTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.endTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.createTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="条件" prop="condition">
                    <el-input v-model="editForm.condition" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="enable">
                    <el-radio-group v-model="editForm.enable">
                        <el-radio class="radio" :label=1>是</el-radio>
                        <el-radio class="radio" :label=0>否</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible=false">取消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
                <el-button v-else type="primary" @click="updateData">修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      }
    };
  }
};
</script>

<style scoped>
</style>





