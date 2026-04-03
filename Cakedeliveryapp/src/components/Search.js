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
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 25,
        marginTop: 20,
    },
    searchInput: {
        marginLeft: 10,
        fontSize: 14,
        flex: 1,
    }
});