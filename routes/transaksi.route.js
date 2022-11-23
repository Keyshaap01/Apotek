/**panggil si express */
const express = require(`express`)
/**membuat object dari express */
const app = express()
/**ijin membaca data request.body */
app.use(express.urlencoded({extended: true}))
/**panggil controller transaksi */
const transaksiController = require(`../controllers/transaksi.controller`)
/**panggil middleware utk authorization */
const authorization = require(`../middleware/authorization`)
/**route mnampilkan form-transaksi */
app.get(`/add`,authorization.cekUser, transaksiController.showFormTransaksi)
/** route utk menyimpan data transaksi */
app.post(`/add`, authorization.cekUser, transaksiController.simpanTransaksi)
/**route utk menampilkan data transaksi */
app.get(`/`,authorization.cekUser,
transaksiController.showTransaksi)
/**route utk menghapus data */
app.get(`/:id`,authorization.cekUser,transaksiController.hapusTransaksi)
/**export onject app */
module.exports = app