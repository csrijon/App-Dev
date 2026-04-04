import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ name,title }) => {
    return (
        <View style={styles.container}>
            
            {/* Left Section */}
            <View style={styles.leftSection}>
                <TouchableOpacity>
                <Image
                    source={require('../images/cakeimage.jpeg')}
                    style={styles.profileImage}
                />
                </TouchableOpacity>
                <View>
                    <Text style={styles.welcomeText}>{title?title:'WELCOME BACK'}</Text>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
            </View>

            {/* Right Section */}
            <TouchableOpacity style={styles.searchBox}>
                <Ionicons name="search" color="#000" size={20} />
            </TouchableOpacity>

        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        height: "auto",
        backgroundColor: "#FFF9E6",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,

    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    welcomeText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#7A7A7A",
        letterSpacing:1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#3E3E3E",
    },
    searchBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EFE7C7",
        justifyContent: "center",
        alignItems: "center",
    }
});