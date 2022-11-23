
/**fungsi authorization */
exports.cekUser = (request, response, next) => {
/**fungsi ini digunakan utk mengecek data user yg disimpan di session 
 * jika data tersimpan di session maka boleh utk mengakses fitur yg diinginkan
 * jika data tidak tersimpan di session,maka akan dikembalikan di hlmn login
*/
 if(request.session.dataUser === undefined){
    return response.redirect(`/auth`)
 }else {
    //lanjut ke fitur yg diinginkan
    next()
 }
}