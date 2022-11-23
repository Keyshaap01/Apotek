/**panggil ekspres */
const express = require(`express`)
/**object app */
const app = express()
/** minta izin untuk membaca data yg dikirimkan melalui form */
app.use(express.urlencoded({ extended: true}))

/**panggil controller customer */
const apotekerController = require (`../controllers/apoteker.controller`)
const authorization = require (`../middleware/authorization`)
/** define route utk akses data cutomer */
app.get(`/`,authorization.cekUser, apotekerController.showDtaApoteker)
/** define route utk nampilin form customer */
app.get(`/add`,authorization.cekUser, apotekerController.showTambahApoteker)
/** define route utk memproses tambah data customer */
app.post(`/add`, authorization.cekUser,apotekerController.prosesTambahData)
/**define route utk menampilkn form cstomer9
 * dengan data yg akn diubah
 */
app.get(`/edit/:id`,authorization.cekUser, apotekerController.showEditApoteker)
/**define rout untuk memproses perubahan data */
app.post(`/edit/:id`,authorization.cekUser, apotekerController.prosesUbahData)
/** export object app */
module.exports= app

/** create route for process delete obat */
app.get("/delete/:id",authorization.cekUser, apotekerController.processDelete)

