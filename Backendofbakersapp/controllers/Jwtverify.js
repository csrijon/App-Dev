import jwt from "jsonwebtoken"

const Jwtverify = (jwttoken) => {

    return jwt.verify(jwttoken, process.env.jwt_secret)
}

export { Jwtverify }