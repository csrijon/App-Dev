

const Loginmainapp = (req, res) => {
    try {
        const { mobile, password } = req.body
        console.log(mobile, password)
        res.json({
            meess: "Login Successfully",
            details:mobile
        })
    } catch (error) {
        console.log(error)
        res.json({
            meess: "Not Working"
        })
    }
}

const LoginAdminapp = (req,res)=>{
     
    try {
        const {email,password} = req.body
        console.log(email,password)
        res.json({
            mess:"LoginAdmin app is working"
        })
    } catch (error) {
        console.log(error)
        res.json({
            mess:"Loginadmin app is not working "
        })
    }

}




export {Loginmainapp,LoginAdminapp}