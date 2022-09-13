<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes = "val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="true">请选择笔记</div>
      <div class="note-detail-ct" v-show="true">
        <div class="note-bar">
          <span>创建日期： {{ curNote.createdAtFriendly }}</span>
          <span>更新日期：{{ curNote.updatedAtFriendly }}</span>
          <span>{{ curNote.statusText }}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" :value="curNote.title" placeholder="输入标题"></input>
        </div>
        <div>
          <textarea v-show="true" :value="curNote.content" placeholder="输入内容，支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Auth from "../apis/auth";
import NoteSidebar from "./NoteSidebar";

export default {
  components: {NoteSidebar},
  data() {
    return {
      curNote: {},
      notes: [],
    }
  },
  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'})
      }
    })
  },
  beforeRouteUpdate(to,from,next){
    console.log('beforeRouteUpdate');
    console.log(to, from);
    this.curNote = this.notes.find(note => note.id === to.query.noteId)
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

}

</style>
