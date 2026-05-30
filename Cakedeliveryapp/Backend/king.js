import QRCode from"qrcode"


const qrgen = async (text)=>{
   try{
   let qr= await QRCode.toDataURL(text)
   console.log(qr)
//    return qr
   }catch{
    console.log("not generate")
   }
}

console.log()
