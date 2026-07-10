

const UserappSignup = async (req, res) => {
    try {
        const { fullname, mobile, password } = req.body
        console.log(mobile, fullname, password)
        res.json({
            mess: "ALL DONE",
            detalis: fullname
        })
    } catch (error) {
        console.log(error)
        res.json({
            mess: "NOT WORKING"
        })
    }
}


const Adminappsignup =async  (req, res) => {

    try {
        const {fullName, email, password } = req.body
        console.log(fullName, email, password)
        res.json({
            mess: "Signup process is working properly"
        })
    } catch (error) {
        console.log(error)
        res.json({
            mess: "Signup process is not working"
        })
    }
}

export { UserappSignup,Adminappsignup }