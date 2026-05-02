function otpgen() {
    return Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
}
console.log(otpgen())

// function getRndInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) ) + min;
// }
// console.log(getRndInteger(5,16))

