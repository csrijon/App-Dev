import { View, TouchableOpacity, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { notifications } from "../services/customerApi";

const Notification = ({ onPress }) => {
    const [unread, setUnread] = useState(true);

    useEffect(() => {
        const check = async () => {
            try {
                const res = await notifications.list();
                const items = (res && res.success && Array.isArray(res.data)) ? res.data : [];
                const hasUnread = items.some((i) => i.isRead === false);
                setUnread(hasUnread);
            } catch (e) { setUnread(false); }
        };
        check();
        const i = setInterval(check, 8000);
        return () => clearInterval(i);
    }, []);

    return (
        <View style={styles.notificationcontainer} >
            <TouchableOpacity style={styles.bellContainer} onPress={onPress}>
                <Ionicons
                    name="notifications-outline"
                    size={22}
                    color="#6B5B53"
                />
            </TouchableOpacity>
            {unread && <View style={styles.notificationbadge} />}
        </View>
    )
}

export default Notification

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
