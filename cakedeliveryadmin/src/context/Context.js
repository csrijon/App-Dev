
import { createContext, useState } from "react";


export const OnbordingContext = createContext()

// provider like a warehouse
export const Onbordingprovider = ({ children }) => {
    const [formdata, setformdata] = useState({
        personaldetails: {
            logo: "",
            bakersname: "",
            ownername: "",
            Bemail: "",
            phonenumber: "",
            businesstype: ""
        },
        location: {
            shopaddress: "",
            landmark: "",
            city: "",
            pincode: "",
            state: ""
        },
        bakedetalis: {
            productnames: ""
        },
        documentdetalis: {
            fssainumber: "",
            fssaiimage: ""
        },
        availability: {
            openingtime: "",
            closingtime: "",
            weeklyoffday: "",
            acceptorder: false,
            deliveryavailable: false,
            deliveryradius: "",
            deliverycharge: "",
            freedeliveryabove: "",
            minimumordervalue: ""
        },
    })
   console.log(formdata.personaldetails);
    return (
        <OnbordingContext.Provider value={{ formdata, setformdata }} >
            {children}
        </OnbordingContext.Provider>
    )
}
