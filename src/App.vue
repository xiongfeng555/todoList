<template>
  <div id="app">
    <div class="page-header">
          <h1>todos</h1>
        </div>
      <div class="todolist-content container">
        <div class="input-group input-group-lg">
          <span class="input-group-addon finger list-group1" id="basic-addon1" @click="changeAllSelected">
            <span class="el-icon-arrow-down"></span>
          </span>
          <input type="text" class="form-control" placeholder="What needs to be done?" aria-describedby="basic-addon1" v-model="value"
            @keyup.enter="addToList" />
        </div>
        <router-view></router-view>
        <ul class="list-group last_box" v-show="$store.getters.getListLength !== 0">
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
      </div>
      <el-button type="success" size="normal" class="btn_save" @click="save" v-show="$store.getters.getListLength!==0">保存</el-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      flag: false,
      value: '',
      url: 'http://localhost:5000',
      list: [],
      len: 0
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
      this.len += 1
    },
    // 删除列表项
    deleteItem (id) {
      this.len--
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
  },
  watch: {
    len (newLength) {
      console.log(newLength)
      if (newLength === 0) {
        this.save()
      }
    }
  }
}
</script>
<style lang="scss">
body{
  font-family: 'Helvetica Neue';
  min-width: 600px;
  background:#f5f5f5;
}
#app {
  font-family: serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin: 0 auto;
  .page-header{
    border-bottom:0 ;
    h1{
      font-size: 100px;
      font-weight: 100;
      color: rgba(175, 47, 47, 0.15);
    }
  }
  .btn_save{
  overflow: hidden;
  margin-top: 40px;
}
}
.todolist-content{
position: relative;
 margin-bottom: 40px;
 max-width: 550px;
 margin: 0 auto;
 font-weight: 300;
 padding: 0;
 box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

.last_box:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 42px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
}
.list-group{
  margin-bottom: 0;
}
.input-group{
  .input-group-addon{
    border-radius: 0;
  }
  .form-control{
    border-radius: 0;
  }
  border-radius: 0;
}
.list-group1 {
  margin-bottom: 0 !important;
  overflow: hidden;
}

.item-count {
  color: #000;
}
.input-group-lg > .form-control{
  height: 51px;
}

.mybtn {
  display: flex;
  justify-content: space-between;
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  .btn-gp{
    display: flex;
     a {
  margin: 0 10px 0;
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  align-self: center;
}
  }

  .mybtn_left{
    display: flex;
    justify-content: space-between;
    width: 70%;
  }
  .mtbtn_right{
    align-self: center;
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
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

.delete{
  font-size: 16px;
}
// 动画效果
.v-enter,
.v-leave-to {
  opacity: 0;
  position: absolute;
}
.v-enter {
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
