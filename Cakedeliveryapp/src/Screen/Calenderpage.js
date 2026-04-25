import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet, Text, Image, ScrollView } from "react-native"
import Simpleheader from "../components/Simpleheader"
import { Calendar } from "react-native-calendars"
import { useState } from "react"
import Button from "../components/Button"

const Calenderpage = ({ navigation }) => {

    const [selecteddate, setselecteddate] = useState("")
    return (
        <SafeAreaView style={styles.Calenderpagecontainer} >
            <Simpleheader />
            <ScrollView vertical contentContainerStyle={{ paddingBottom: 40 }} style={styles.calenderwrapper} >
                <View style={styles.calendertoptext} >
                    <Text style={styles.calendarTitle} >Pick a Sweet Moment</Text>
                    <Text style={styles.calendarSubtitle} >Select your preferred date for cake delivery or pickup. Our ovens are ready.</Text>
                </View>

                <View style={styles.maincalender} >
                    <Calendar onDayPress={(day) => {
                        setselecteddate(day.dateString)
                    }} style={{
                        padding: 20,
                        borderRadius: 48,
                        arrowColor: "#fff"
                    }}
                        theme={{
                            backgroundColor: '#fff',
                            calendarBackground: '#fff',
                            todayTextColor: "red",
                            arrowColor: "#000",
                            selectedDayTextColor: "black"
                        }}
                        markedDates={{
                            [selecteddate]: { selected: true, selectedColor: "#f6cfc2", color: "black" }
                        }}
                    />
                </View>

                <View style={styles.cardShell}>

                    <View style={styles.imageWrap}>
                        <Image
                            source={{ uri: "https://i.imgur.com/8Km9tLL.png" }} // replace with your cake image
                            style={styles.cakeImage}
                        />
                    </View>

                    <View style={styles.textBlock}>
                        <Text style={styles.titleText}>Classic Velvet Noir</Text>
                        <Text style={styles.subtitleText}>
                            Scheduled for: <Text style={styles.highlightText}>Oct 9th, 2024</Text>
                        </Text>
                    </View>

                </View>

                <View style={styles.confirmbutton} >
                    <Button onPress={()=> navigation.navigate("MyOrder")} title={"Confirm Date"} />
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Calenderpagecontainer: {
        flex: 1,
        backgroundColor: "#fff9e6"
    },
    calenderwrapper: {
        flex: 1,
        paddingHorizontal: 24
    },
    calendertoptext: {
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 20
    },
    calendarTitle: {
        letterSpacing: -0.4,
        fontWeight: 800,
        fontSize: 16
    },
    calendarSubtitle: {
        color: "#646040",
        textAlign: "center",
        fontSize: 15,
    },
    maincalender: {
        marginTop: 30
    },
    cardShell: {
        backgroundColor: "#f6cfc24d",
        borderRadius: 40,
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        alignSelf: "center",
        marginTop: 30
    },

    imageWrap: {
        backgroundColor: "#F2E6D6",
        padding: 8,
        borderRadius: 50,
        marginRight: 14,
    },

    cakeImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
    },

    textBlock: {
        flex: 1,
    },

    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#3E2C2C",
    },

    subtitleText: {
        fontSize: 13,
        color: "#6F5C4F",
        marginTop: 4,
    },

    highlightText: {
        fontWeight: "600",
        color: "#3E2C2C",
    },
    confirmbutton:{
        marginTop:20
    }

})

export default Calenderpage