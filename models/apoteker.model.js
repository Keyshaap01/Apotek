/** function utk CRUD */

/** load connectin dari  config */
const connection = require('../config')

const namaTabel = `apoteker`

/** fungtion ambil data customer */
exports.ambilDataApoteker = () => {
    return new Promise((resolve, reject) => {
        /**query ambil data */
        let query = `select * from apoteker`
        /**jalankan querynya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}
/**function untk ambil data berdasarkan parameter khusus */
exports.ambilDenganParameter = (parameter) => {
    return new Promise((resolve, reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select * from apoteker where ${params}`
        /**jalankan querynya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** function utk menambah data customer baru  */
exports.tambahApoteker = (apoteker) => {
    return new Promise((resolve, rejected) => {
        /** ambil key dari object customer */
        let key = Object
            .keys(apoteker) // [key1,key2,dst]
            .join() // "key1,key2,dst"

        /** ambil value dari object customer */
        let value = Object
            .keys(apoteker) // [key1,key2,dst]
            .map(item => `"${apoteker[item]}"`) // untuk scanning, ["value1","value2",dst]
            .join() // `"values1","value2",dst`

        let query = `insert into apoteker (${key}) values (${value})`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/**buat fungsi untuk update data customer */
exports.ubahApoteker = (data, parameter) => {
    /**menyusun string utk query bagian perubahan data */
    return new Promise((resolve, reject) => {
        let perubahanData = Object
            .keys(data) // [nama_apoteker,alamat]
            .map(item => `${item}="${data[item]}"`)
            .join()
        /** menyusun string utk query bagian
         * penentu data yg akan diubah
         */
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        /** susun query */
        let query = `update apoteker set ${perubahanData} where ${params}`
         /** jalankan query-nya */
         connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })


    })
}

exports.delete = (parameter) => {
    return new Promise((resolve, rejected) => {
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")
        

        /** create query for delete */
        let query = `delete from ${namaTabel} where ${params}`

        /** show query as log in console */
        console.log(`Run: ${query}`)

        /** run query */
        connection.query(query, (error, result) => {
            if (error) {
                /** reject with error message */
                rejected(error.message)
            }

            /** return resolve with data */
            resolve(result)
        })
    })
}