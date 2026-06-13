import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Search = () => {
    return (
        <View style={styles.searchWrapper}>
            <Ionicons name="search-outline" color="#8E8E8E" size={20} />
            <TextInput
                placeholder="Search for artisanal bakes..."
                placeholderTextColor="#8E8E8E"
                style={styles.searchInput}
            />
        </View>
    )
}

export default Search;

const styles = StyleSheet.create({
    searchWrapper: {
        backgroundColor: "#F3EFD9",
        flexDirection: "row",
        alignItems: "center",

        height: 50,
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 16,

        shadowColor: "#0000000d",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        elevation: 4,
    },
    searchInput: {
        marginLeft: 10,
        fontSize: 14,
        flex: 1,
        paddingRight: 16,

    }
});