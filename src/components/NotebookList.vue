<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表（{{ notebooks.length }}）</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`" class="notebook">
            <div>
              <span class="icon-notebook"></span>{{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.pr.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.createdAtFriendly }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "../apis/auth";
import Notebooks from "../apis/notebooks";
import {friendlyDate} from "../helpers/util";
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    // Auth.getInfo().then(res => {
    //   if (!res.isLogin) {
    //     this.$router.push({path: '/login'})
    //   }
    // })
    // Notebooks.getAll().then(res => {
    //   this.notebooks = res.data
    // })
    this.checkLogin({path: '/login'}),
    this.$store.dispatch('getNotebooks')
  },
  computed: {
    ...mapGetters(['notebooks'])
  },

  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook',
      'checkLogin'
    ]),

    onCreate() {
      this.$prompt('输入新笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      })
        .then(({value}) => {
          this.addNotebook({title:value})
        })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('输入新笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:notebook.title,
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        this.updateNotebook({notebookId: notebook.id, title: value})
      })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗？', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(notebook);
        this.deleteNotebook({notebookId: notebook.id})
      })
    }
  }
}

</script>

<style lang="less" scoped>
@import url(../assets/css/notebool-list.less);
</style>
