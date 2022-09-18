import Note from '../../apis/notes'
import {Message} from "element-ui";

const state = {
  notes: null,
  curNoteId: null,
}

const getters = {
  notes: state => state.notes || [],
  curNote: state =>{
    if(!Array.isArray(state.notes)) return {}//如果state.notes不是数组，代表state.notes还没有初始化
    if(!state.curNoteId) return state.notes[0] || {}//如果没有设置curNote，就取state.notes的第0项
    return state.notes.find(note => note.id == state.curNoteId) || {}
  }
}

const mutations = {
  setNotes(state, payload) {
    state.notes = payload.notes
  },

  addNote(state, payload) {
    state.notes.unshift(payload.note)
  },

  updateNote(state, payload) {
    let note = state.notes.find(note => note.id === payload.noteId) || {}
    note.title = payload.title
    note.content = payload.content
  },
  deleteNote(state, payload) {
    state.notes = state.notes.filter(note => note.id !== payload.noteId)
  },
  setCurNote(state,payload = {}){
    state.curNoteId = payload.noteId
  }
}


const actions = {
  getNotes({commit}, {notebookId}) {
    return Note.getAll({notebookId}).then(res => {
      commit('setNotes', {notes: res.data})
    })
  },

  addNote({commit}, {notebookId, title, content}) {
    return Note.addNote({notebookId}, {title, content}).then(res => {
      console.log(33);
      commit('addNote', {note: res.data})
      Message.success(res.msg)
    })
  },

  updateNote({commit}, {noteId, title, content}) {
    return Note.updateNote({noteId}, {title, content}).then(res => {
      commit('updateNote', {noteId, title, content})
    })
  },

  deleteNote({commit}, {noteId}) {
    return Note.deleteNote({noteId}).then(res => {
      commit('deleteNote', {noteId})
      Message.success(res.msg)
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
