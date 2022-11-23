/**panggil si express */
const express = require(`express`)
/**buat objek utk express */
const app = express()
/**minta ijin utk membaca request user */
app.use(express.urlencoded({ extended: true }))
/**panggil controller auth */
const authController = require(`../controllers/auth.controller`)
/**route menampilkan halaman login */
app.get(`/`, authController.showLogin)
/**memebuat route proses login */
app.post(`/`, authController.authentication)
/**membuat route proses logout */
app.get(`/logout`, authController.logout)
/**export object app */
module.exports = app