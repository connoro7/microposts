import { http } from './http'
import { ui } from './ui'

let PORT = 3000
let server = `http://localhost:${PORT}`
let fileName = '/posts' // The name (or filepath & name) of the file on the server containing our desired resource

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost)

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)

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
      // Logs all data getPosts is sending to the server
      // console.log('App Test - Submit Post: ', getPosts())
    })
    .catch((err) => {
      console.log(err)
    })
}

function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id
    if (confirm('Are you sure?')) {
      // Logs the URL of the deleted item
      // console.log(`App Test - Deleting item at: ${server}${fileName}/${id}`)
      http
        .delete(`${server}${fileName}/${id}`)

        .then((data) => {
          ui.showAlert('Post deleted', 'alert alert-success')
          getPosts()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  e.preventDefault()
}

// Enable Edit State
function enableEdit(e) {
  // Test: logs the click event target (works on all elements, so make sure to click in the correct spot)
  // console.log('App Test - Event Target Element Is: ', e.target)
  if (e.target.parentElement.classList.contains('edit')) {
    // Test: logs the id assigned to the parent element containing each edit icon, to make sure we're targeting the correct element
    // console.log('App Test - Dataset ID#: ', e.target.parentElement.dataset.id)
    const id = e.target.parentElement.dataset.id

    // Test: DOM traversal to find the correct element
    // console.log('Target parentElement: ', e.target.parentElement)
    // console.log('Target previousElementSibling: ', e.target.parentElement.previousElementSibling)
    // console.log('Target previousElementSibling textContent: ', e.target.parentElement.previousElementSibling.textContent) // Gives us the correct body content for the clicked element
    const body = e.target.parentElement.previousElementSibling.textContent

    // console.log('Target previousElementSibling previousElementSibling textContent: ', e.target.parentElement.previousElementSibling.previousElementSibling.textContent) // Gives us the correct title content for the clicked element
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent

    const data = {
      id,
      title,
      body,
    }

    // Fill form with selected post for editing
    ui.fillForm(data)
  }
  e.preventDefault()
}
