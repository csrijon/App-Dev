
import QRCode from "qrcode"

// const data = "csrijon92@okicici"
async function qrcodegen(data){
    let qrurl = await QRCode.toDataURL(data)
    return qrurl
}
const qr = await qrcodegen("csrijon92@okicici")
console.log(qr)