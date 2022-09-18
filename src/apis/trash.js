import request from "../helpers/request";
import {friendlyDate} from '../helpers/util'

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data.sort((note1, note2) => note1.createdAt < note2.createdAt ? 1 : -1)
        res.data.forEach(note => {
          note.createdAtFriendly = friendlyDate(note.createdAt)
          note.updatedAtFriendly = friendlyDate(note.createdAt)
        })
        console.log(res.data);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  deleteNote({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    console.log(333);
  },
  revertNote({noteId}) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
  },

  // addNoteBook({title = ''} = {title:''}) {
  //   return request(URL.ADD,'POST',{title})
  // }
}
