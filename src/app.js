import { http } from './http'
import { ui } from './ui'

let PORT = 3000
let server = `http://localhost:${PORT}`
let fileName = '/posts' // The name (or filepath & name) of the file on the server containing our desired resource

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// GET posts from server
function getPosts() {
  http
    .get(server + fileName)
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err))
}

// Adds post to server
function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value

  const data = {
    title,
    body,
  }

  // Create POST request
  http
    .post(server + fileName, data)
    .then((data) => {
      ui.showAlert('Post added', 'alert alert-success')
      ui.clearFields()
      getPosts()
      //   console.log('App Test - Submit Post: ', getPosts())
    })
    .catch((err) => {
      console.log(err)
    })
}
