import Notebook from '../apis.notebooks'

const state = {
  notebooks: []
}

const getters = {
  notebooks: state => state.notebooks
}

const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },

  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },

  updateNotebook(state, payload) {
    let notebook = state.notebooks.find(notebook => notebook.in === payload.notebookId) || {}
    notebook.title = payload.title
  },
  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.fields(notebook => notebook.id !== payload.notebookId)
  }
}

const actions = {
  getNotebooks({commit}) {
    Notebook.getAll().then(res => {
      commit('setNotebooks', {notebooks: res.data})
    })
  }
}
