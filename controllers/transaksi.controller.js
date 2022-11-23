
const obatModel = require(`../models/obat.model`)
const customerModel = require(`../models/customer.model`)
// memanggil model transaksi
const transaksiModel = require(`../models/transaksi.model`)
// memamggil model detail transaksi
const detailModel = require(`../models/detail_transaksi.model`)
const { request, response } = require("../routes/transaksi.route")

/** function utk menampilkan form transaksi */
exports.showFormTransaksi = async (request, response) => {
    try {
        /**panggil data obat */
        let obat = await obatModel.findAll()
        /**ambil data customer */
        let customer = await customerModel.ambilDataCustomer()
        /**prepare data yg di pasingbke view */
        let sendData = {
            dataObat: obat,
            dataCustomer: customer,
            page: `form-transaksi`,
            no_faktur: ``,
            tgl_transaksi: ``,
            dataObatString: JSON.stringify(obat),
            dataUser: request.session.dataUser,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/**membuat fungsi menambahkan obat ke keranjang */
exports.addToCart = async (request, response) => {
    try {
        // dapetin data obat berdasar id obat yg dikirimksm
        let selectedObat = await obatModel.findByCriteria({
            id: request.body.id_obat,

        })
        /**tampung data yg dikirimkan */
        let storeData =
        {
            id_obat: request.body.id_obat,
            nama_obat: selectedObat[0].nama_obat,
            jumlah_beli: request.body.jumlah_beli,
            harga_beli: request.body.harga_beli
        }
        /**masukkan data kek keranjang dengan session */
        request.session.cart.push(storeData)
        /**puah()-> menambah data kedalam arry */
        /**direct ke hlmn form-transaksi */
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

//membuat function menghapuss item pada kreranjang
exports.hapusCart = async (request, response) => {
    try {
        // ambil seluruh dat char pada session
        let cart = request.session.cart
        //ambil id obat yg akan dihapus
        let id_obat = request.params.id;
        //cari tahu posisi index dari data yg akan dihapus
        let index = cart.findIndex(item => item.id_obat == id_obat)
        // hapus dat ssesuai index
        cart.splice(index, 1)
        //splice digunakan untuk menghapus pada array
        // kembalikan data chart nya pada session
        request.session.cart = cart
        //direct ke halaman form transaksi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
// function menyimpan daat transaksi
exports.simpanTransaksi = async (request, response) => {
    try {
        // tampung data yg dikirimkan
        let newTransaksi = {
            no_faktur: request.body.no_faktur,
            tgl_transaksi: request.body.tgl_transaksi,
            id_customer: request.body.id_customer,
            id_apoteker: request.session.dataUser.id
        }
        // simpan transaksi
        let resultTransaksi = await transaksiModel.add(newTransaksi)
        // menampung isi cart
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) {
            // hapus key "nama_obat" dari cart
            delete cart[i].nama_obat
            // tambahi key id transaksi kedalam cart
            cart[i].id_transaksi = resultTransaksi.insertId
            // eksekusi simpan cart ke detail_transaksi
            await detailModel.add(cart[i])
        }
        // hapus cart
        request.session.cart = []
        // direct ke hlmn form transaksi lagi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
//  fungsi menampilkan data transaksi
exports.showTransaksi = async (request, response) => {
    try {
        /**ambil data transaksi */
        let transaksi = await transaksiModel.findAll()
        /**sisipin data detail dari setiap transaksi */
        for (let i = 0; i < transaksi.length; i++) {
            /**ambil id transaksi */
            let id = transaksi[i].id
            /**ambil data detailnya sesuai id */
            let detail = await detailModel.findByCriteria({ id_transaksi: id })
            /**sisipin detail ke trasaksi */
            transaksi[i].detail = detail


        }
        //  prepare data yg dikirim ke view
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/**function utk menghapus data transaksi */
exports.hapusTransaksi = async(request,response) => {
    try {
        let id = request.params.id
        /**menghapus data detail transaksi */
        await detailModel.delete({ id_transaksi: id })
        /**menghapus data transaksi */
        await transaksiModel.delete({ id: id })
        /**kembali ke halaman transaksi */
        return response.redirect(`/transaksi`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
