import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: [], // 首页渲染的数据
    url: 'http://localhost:5000' // 请求后台的url
  },
  mutations: {
    // 把从后台获取的数据赋值给todoList
    setTodoList (state, list) {
      state.todoList = list
    },
    // 新增数据
    addTodoList (state, obj) {
      state.todoList.push(obj)
    },
    // 根据id删除数据
    deleteTodoItem (state, id) {
      state.todoList.forEach((item, index) => {
        if (item.id === id) {
          state.todoList.splice(index, 1)
        }
      })
    },
    // 根据id和状态改变todoList中的状态
    changeSelected (state, obj) {
      state.todoList.forEach(item => {
        if (item.id === obj.id) {
          item.selected = obj.selected
        }
      })
    },
    // 清空所有选中项
    clearItem (state) {
      var arr = []
      state.todoList.forEach(item => {
        if (!item.selected) {
          arr.push(item)
        }
      })
      state.todoList = arr
    },
    // 把列表项中所有项的状态设置为选中状态
    changeAllTrueSelected (state) {
      state.todoList.forEach(item => {
        item.selected = true
      })
    },
    // 把列表项中所有项的状态设置为不选中状态
    changeAllFalseSelected (state) {
      state.todoList.forEach(item => {
        item.selected = false
      })
    }
  },
  actions: {
    // 异步请求后台数据
    getTodoList ({ commit, state }) {
      axios.get(state.url).then(res => {
        if (res.status === 200) {
          if (res.data.err_code === 1) {
            commit('setTodoList', res.data.message)
          } else {
            console.log('sever error')
          }
        } else {
          console.log('服务器出错')
        }
      })
    }
  },
  modules: {},
  getters: {
    // 返回列表项中被选中项的数量
    getListSelectedLength (state) {
      var len = 0
      state.todoList.forEach(item => {
        if (!item.selected) {
          len += 1
        }
      })
      return len
    },
    // 获取id与状态的对应对象
    getSelected (state) {
      var o = {}
      state.todoList.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    // 获取所有列表项的长度
    getListLength (state) {
      return state.todoList.length
    },
    // 如果有状态被选中返回true，否则返回false
    getClearCount (state) {
      var flag = false
      state.todoList.forEach(item => {
        if (item.selected) {
          flag = true
        }
      })
      return flag
    },
    // 获取所有状态为false的数组
    getActivedList (state) {
      var arr = []
      state.todoList.forEach(item => {
        if (!item.selected) {
          arr.push(item)
        }
      })
      return arr
    },
    // 获取所有状态为true的数组
    getCompletedList (state) {
      var arr = []
      state.todoList.forEach(item => {
        if (item.selected) {
          arr.push(item)
        }
      })
      return arr
    },
    // 获取所有列表项
    getAllList (state) {
      return state.todoList
    }
  }

})
