import { View, TouchableOpacity, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";

const Notificaton = () => {
    return (
        <View style={styles.notificationcontainer} >
            <TouchableOpacity style={styles.bellContainer}>
                <Ionicons
                    name="notifications-outline"
                    size={22}
                    color="#6B5B53"
                />
            </TouchableOpacity>
            <View style={styles.notificationbadge} />
        </View>
    )
}

export default Notificaton

const styles = StyleSheet.create({
    bellContainer: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#EEE5C8",
        justifyContent: "center",
        alignItems: "center",
    },
    notificationcontainer: {
        position: "relative"
    },
    notificationbadge: {
        position: "absolute",
        top: 4,
        right: 10,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#C0392B",
    },
})