<template>
    <div>
         <ul class="list-group">
          <li class="list-group-item item" v-for="item in $store.getters.getAllList" :key="item.id">
            <div class="item_contain">
              <el-switch active-color="green" inactive-color="#aaa" v-model="$store.getters.getSelected[item.id]" @change="changeSelected(item.id,$store.getters.getSelected[item.id])">
    </el-switch>
              <p :class="item.selected ? 'line':''" class="data_content">{{ item.data }}</p>
            </div>
             <a href="#" @click.prevent="deleteItem(item.id)" class="delete">×</a>
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
      this.$parent.len -= 1
    },
    changeSelected (id, selected) {
      this.$store.commit('changeSelected', { id: id, selected: selected })
    }
  }
}
</script>
<style lang="scss" scoped>
.item{
  display: flex;
  justify-content: space-between;
}
.item-count {
  color: #000;
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
.list-group{
  font-size: 24px;
  .data_content{
  font-size: 24px;
  line-height: 0.8;
}
}

.btn-gp button {
  margin: 0 10px 0;
}
.item_contain {
  display: flex;
  // align-items: center;
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
.delete{
  font-size: 16px;
  display: none;
}
.list-group-item:hover .delete{
    display: inline-block;
}
</style>
