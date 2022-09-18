<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ curBook.title }} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  created() {
    this.getNotebooks()
      .then(() =>{
      this.setCurBook({curBookId: this.$route.query.notebookId})
      return this.getNotes({notebookId: this.curBook.id})
    })
      .then(() => {
        this.setCurNote({ curNoteId: this.$route.query.noteId })
        this.$router.replace({
          path:'/note',
          query: {
            noteId: this.curNote.id,
            notebookId: this.curBook.id
          }
        })
      })
    // Notebooks.getAll().then(res => {
    //   this.notebooks = res.data
    //   this.curBook = this.notebooks.find(notebook => notebook.id === this.$route.query.notebookId) || this.notebooks[0] || {}
    //   return Notes.getAll({notebookId: this.curBook.id}).then(res => {
    //     this.notes = res.data
    //     this.$emit('update:notes', this.notes)
    //     Bus.$emit('update:notes', this.notes)
    //   })
    // })
  },
  data() {
    return {}
  },
computed:{
  ...mapGetters([
    'notebooks',
    'notes',
    'curBook',
    'curNote'
  ])
},

  methods: {
    ...mapMutations([
      'setCurNote',
      'setCurBook'
    ]),
    ...mapActions([
      'getNotebooks','getNotes'
    ]),

    onAddNote(notebookId) {
      this.$prompt('输入新笔记标题', '修改笔记标题', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^.{1,30}$/,
            inputErrorMessage: '标题不能为空，且不超过30个字符'
          }).then(({value}) => {
        this.$store.dispatch('addNote', {notebookId: this.curBook.id, title: value, content: ''})
      })
    },
      // this.$prompt('输入新笔记标题', '修改笔记标题', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputPattern: /^.{1,30}$/,
      //   inputErrorMessage: '标题不能为空，且不超过30个字符'
      // }).then(({value}) => {

      // })
      // },
        // return Notes.addNote({notebookId: this.curBook.id})
      // }).then((res) => {
      //   // res.data.title = value
      //   this.notes.unshift(res.data)
      //   console.log(this.curBook);
      //   this.$message.success(data.msg)
      // })

    handleCommand(notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'})
      }
      this.$store.commit('setCurBook',{curBookId:notebookId})
      this.getNotes({notebookId})
        .then(() => {
          this.setCurNote()
          this.$router.replace({
            path:'/note',
            query: {
              noteId: this.curNote.id,
              notebookId: this.curBook.id
            }
          })
        })
      // Notes.getAll({notebookId}).then(res => {
      //   this.notes = res.data;
      //   console.log('222');
      //   this.curBook = this.notebooks.find(notebook => notebook.id === notebookId)
      //   this.$emit('update:notes', this.notes)
      //   Bus.$on('update:notes', this.notes)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar);
</style>
