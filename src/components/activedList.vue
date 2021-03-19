<template>
    <div>
         <ul class="list-group">
          <li class="list-group-item" v-for="item in $store.getters.getActivedList" :key="item.id">
            <div class="item_contain">
              <el-switch active-color="green" inactive-color="#aaa" v-model="$store.getters.getSelected[item.id]" @change="changeSelected(item.id,$store.getters.getSelected[item.id])">
    </el-switch>
              <p :class="item.selected ? 'line':''">{{ item.data }}</p>
              <a href="#" @click.prevent="deleteItem(item.id)" class="delete">删除</a>
            </div>
          </li>
        </ul>
        </div>
</template>
<script>
// import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  methods: {
    deleteItem (id) {
      this.$store.commit('deleteTodoItem', id)
    },
    changeSelected (id, selected) {
      this.$store.commit('changeSelected', { id: id, selected: selected })
    }
  }
}
</script>
<style lang="scss" scoped>

.item-count {
  color: #000;
}

.list-group {
  margin-bottom: 0 !important;
}
.mybtn {
  display: flex;
  justify-content: space-between;
  .mybtn_left{
    display: flex;
    justify-content: space-between;
    width: 60%;
  }
}

.btn-gp button {
  margin: 0 10px 0;
}
.item_contain {
  display: flex;
  // align-items: center;
  justify-content: space-between;
  p {
    margin-left: 30px;
    font-size: 18px;
  }
}
.btn_save{
  margin-top: 20px;
}
.line{
  text-decoration: line-through;
  color: #d9d9d9;
}
</style>
