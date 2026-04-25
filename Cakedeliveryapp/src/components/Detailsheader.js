import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Detailsheader = () => {
    return (
        <View style={styles.Detailsheader} >
            <View style={styles.headerContent} >
                <TouchableOpacity  >
                    <AntDesign name="arrowleft" color="#75584e" size={24} />
                </TouchableOpacity>
                <Text style={styles.headercontenttext} >The Artisanal Patisserie</Text>
            </View>
            <View style={styles.headerContent} >
                <Ionicons name="search-outline" color="#75584e" size={20} />
                <TouchableOpacity>
                    <Image
                        source={require('../images/cakeimage.jpeg')}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Detailsheader;

const styles = StyleSheet.create({
    Detailsheader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        height: "auto",
        paddingVertical: 20,
        backgroundColor: "#fff9e6",
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
        objectFit: "cover",
        resizeMode: "cover",
    },
    headercontenttext: {
        fontSize: 16,
        fontWeight: "700",
        color: "#75584e"
    }

})