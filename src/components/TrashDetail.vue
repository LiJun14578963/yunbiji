<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span>创建时间： {{ curTrashNote.createdAtFriendly }}</span>
        <span>|</span>
        <span>更新时间： {{ curTrashNote.updatedAtFriendly }}</span>
        <span>|</span>
        <span>所属笔记本：{{ belongTo }}</span>

        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div>
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import Trash from "../apis/trash";
import {mapGetters, mapActions, mapMutations, mapState} from 'vuex'


window.Trash = Trash
let md = new MarkdownIt()
export default {
  data() {
    return {}
  },
  created() {
    this.checkLogin({path: '/login'})
    this.getNotebooks()
    this.getTrashNotes()
      .then(() => {
        this.setCurTrashNote({curTrashNoteId: this.$route.query.noteId})
        this.$router.replace({
          path: '/trash',
          query: {noteId: this.curTrashNote.id}
        })
      })

    // Auth.getInfo().then(res => {
    //   if (!res.isLogin) {
    //     this.$router.push({path: '/login'})
    //   }
    // })
  },

  computed: {
    ...mapGetters([
      'trashNotes',
      'curTrashNote',
      'belongTo'
    ]),
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
      'setCurTrashNote'
    ]),
    ...mapActions([
      'checkLogin',
      'getTrashNotes',
      'deleteTrashNote',
      'revertTrashNote',
      'getNotebooks'
    ]),
    onRevert() {
      this.revertTrashNote({noteId: this.curTrashNote.id})
        .then(() => {
          this.setCurTrashNote()
          this.$router.replace({
            path: '/trash',
            query: {noteId: this.curTrashNote.id}
          })
        })
    },

    onDelete() {
      this.$confirm('删除后将无法恢复', '确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTrashNote({noteId: this.curTrashNote.id})
          .then(() => {
            this.setCurTrashNote()
            this.$router.replace({
              path: '/trash',
              query: {noteId: this.curTrashNote.id}
            })
          })
      })
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({curTrashNoteId: to.query.noteId})
    next()
  }
}
</script>

<style scoped lang="less">
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;

    }
  }
}
</style>
