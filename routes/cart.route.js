// panggil ekspres
const express = require(`express`)
// bikin object express
const app = express()
// minta ijin membaca data
app.use(express.urlencoded({extended:true}))
// panggil controller
const transaksiController = require(`../controllers/transaksi.controller`)
//panggil authorization dari middle ware
const authorization = require(`../middleware/authorization`)
//definisi route utk menambah isi cart
app.post(`/`,authorization.cekUser,transaksiController.addToCart)
//definisikan route menghapus item pd cart
app.get(`/:id`, authorization.cekUser,
transaksiController.hapusCart)
//exports object app
module.exports = app