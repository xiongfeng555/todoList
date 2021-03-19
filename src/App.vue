<template>
  <div id="app">
    <div class="container">
      <div class="todolist-content">
        <div class="page-header">
          <h1>todos</h1>
        </div>
        <div class="input-group input-group-lg">
          <span class="input-group-addon finger list-group1" id="basic-addon1" @click="changeAllSelected">
            <span class="el-icon-arrow-down"></span>
          </span>
          <input type="text" class="form-control myinput" placeholder="What needs to be done?" aria-describedby="basic-addon1" v-model="value"
            @keyup.enter="addToList" />
        </div>
       <router-view></router-view>
        <ul class="list-group" v-show="$store.getters.getListLength !== 0">
          <li class="list-group-item">
            <div class="mybtn">
              <div class="mybtn_left">
                <span class="item-count">{{ $store.getters.getListSelectedLength }} items left</span>
              <div class="btn-gp">
                <router-link class="btn btn-default btn-xs" to="/all">All</router-link>
                <router-link class="btn btn-default btn-xs" to="/actived">Active</router-link>
                <router-link class="btn btn-default btn-xs" to="/completed"> Completed</router-link>
              </div>
              </div>
              <button class="btn btn-default btn-xs mtbtn_right" v-show="$store.getters.getClearCount" @click="clearItem">clear completed</button>
            </div>
          </li>
        </ul>
        <el-button type="success" size="normal" class="btn_save" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      flag: false,
      value: ''
    }
  },
  created () {
    this.getAllInfoList()
  },
  methods: {
    // 增加数据
    addToList () {
      // this.list.push({
      //   id: Date.now(),
      //   value: this.value
      // })
      var o = {
        id: Date.now().toString(),
        data: this.value,
        selected: false
      }
      this.$store.commit('addTodoList', o)
      this.value = ''
    },
    // 删除列表项
    deleteItem (id) {
      this.$store.commit('deleteTodoItem', id)
    },
    // 从数据库初始化列表数据
    getAllInfoList () {
      this.$store.dispatch('getTodoList')
    },
    // 改变列表项状态
    changeSelected (id, selected) {
      this.$store.commit('changeSelected', { id: id, selected: selected })
    },
    // 清空选中的列表项
    clearItem () {
      this.$store.commit('clearItem')
    },
    // 把vuex中的todoList保存到数据库中
    save () {
      axios.post(this.url + '/save', this.$store.state.todoList).then(res => {
        console.log(res)
      })
      alert('保存成功')
    },
    // 全选/全不选
    changeAllSelected () {
      if (!this.flag) {
        this.$store.commit('changeAllTrueSelected')
        this.flag = true
      } else {
        this.$store.commit('changeAllFalseSelected')
        this.flag = false
      }
    }
  },
  computed: {
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.list-group1 {
  margin-bottom: 0 !important;
  overflow: hidden;
}

.item-count {
  color: #000;
}

.mybtn {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  .btn-gp{
    display: flex;
     a {
  margin: 0 10px 0;
  font-size: 16px;
  align-self: center;
}
  }

  .mybtn_left{
    display: flex;
    justify-content: space-between;
    width: 60%;
  }
  .mtbtn_right{
    font-size:16px ;
    align-self: center;
  }
}
.finger{
  cursor: pointer;
}

.item_contain {
  display: flex;
  // align-items: center;
  justify-content: space-between;
  p {
    margin-left: 30px;
    font-size: 16px;
  }
}
.btn_save{
  overflow: hidden;
  margin-top: 40px;
}
.delete{
  font-size: 16px;
}
</style>
