

const Addresssaveclick = (req, res) => {

    try {
        const { street, apartment, city, state, zip, isDefault } = req.body
        console.log(street, apartment, city, state, zip, isDefault)
        res.json({
            message: "Address save finction is working"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Address save function is not wokring "
        })
    }

}

export { Addresssaveclick }