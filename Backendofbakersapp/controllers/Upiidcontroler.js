

const upiidhandeler = (req,res)=>{
    try {
        const {upiid} = req.body
        console.log(upiid)
        res.json({
            mess:"i go upi id",
            id:upiid
        })
    } catch (error) {
        console.log(error)
        res.json({
            mess:"upi is not get",
        })
    }
}

export {upiidhandeler}