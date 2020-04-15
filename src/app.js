import { http } from './http'
import { ui } from './ui'

let PORT = 3000
let server = `http://localhost:${PORT}`

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

function getPosts() {
  http
    .get(server + '/posts')
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err))
}
