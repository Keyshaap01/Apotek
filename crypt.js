/**memanggil library crypto-js */
const crypto = require (`crypto-js`)
/**membuat function */
exports.enkripsi = (plainText) => {
    /**bikit secret key */
    let secretKey =`YTTA`
    /**proses enkripsi 
     * AES =Advance Encryption Standart
    */
    let result = crypto.AES.encrypt(plainText, secretKey).toString()
    return result 

}
/**membuat fungsi deskkripsi */
exports.deskripsi = (chiperText) => {
    /**define se cretKey */
    let secretKey =`YTTA`
    /**Proses deskripsi */
    let byte = crypto.AES.decrypt(chiperText,secretKey)
    let result = byte.toString(crypto.enc.Utf8)
    return result 

}
