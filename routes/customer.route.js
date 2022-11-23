/**panggil ekspres */
const express = require(`express`)
const { authentication } = require("../controllers/auth.controller")
/**object app */
const app = express()
/** minta izin untuk membaca data yg dikirimkan melalui form */
app.use(express.urlencoded({ extended: true}))

/**panggil controller customer */
const customerController = require (`../controllers/customer.controller`)
const authorization = require(`../middleware/authorization`)
/** define route utk akses data cutomer */
app.get(`/`,authorization.cekUser, customerController.showDtaCuatomer)
/** define route utk nampilin form customer */
app.get(`/add`,authorization.cekUser, customerController.showTambahCustomer)
/** define route utk memproses tambah data customer */
app.post(`/add`,authorization.cekUser, customerController.prosesTambahData)
/**define route utk menampilkn form cstomer
 * dengan data yg akn diubah
 */
app.get(`/edit/:id`,authorization.cekUser, customerController.showEditCustomer)
/**define rout untuk memproses perubahan data */
app.post(`/edit/:id`, authorization.cekUser, customerController.prosesUbahData)
/** export object app */
module.exports= app

/** create route for process delete obat */
app.get("/delete/:id",authorization.cekUser, customerController.processDelete)

