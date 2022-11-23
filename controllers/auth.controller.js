/**load model apoteker */
const apotekerModel = require(`../models/apoteker.model`)
/**load crypt */
const crypt = require(`../crypt`)
const { request, response } = require("express")

/**function menampilkan halaman login */
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }

}
/**function proses autentication */
exports.authentication = async (request, response) => {
    try {
        /**tampung data username password */
        let username = request.body.username
        let password = request.body.password
        console.log(`${username} - ${password}`);


        /**cek kecocokan username */
        let result = await apotekerModel.ambilDenganParameter({ username: username })
        /**cek keberadaan data apoteker */
        if (result.length > 0) {
            console.log(result);
            /**cek kecocokan pw 
             * 123 === crypt.deskripsi(sxsxsxsxd)
             * l 
             * result = array
            */
           
            if (password === crypt.deskripsi(result[0].password)) {
                /**login berhasil */
                /**menipan data user ke sesiion */
                /**`user data` = label of session */
                request.session.dataUser = result[0]  
                // console.log(result[0]);
                request.session.cart = []
                return response.redirect(`/obat`)
                /**definisi cart di session */
                

            } else {
                /**login gagal */
                return response.redirect(`/auth`)
            }

        } else {
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/**Fungsi utk logout */
exports.logout = async(request,response) => {
    try {
        /**menghapus data user dari session */
        request.session.dataUser = undefined
        /**kembali halaman login */
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}