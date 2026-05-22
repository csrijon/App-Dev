import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TextInput,StyleSheet } from "react-native"

const Search = ({placeholder}) => {
    return (
        <View style={Searchstyle.Searchsection} >
            <Ionicons name="search-outline" color="#000" size={24} />
            <TextInput placeholder={placeholder} />
        </View>
    )
}

export default Search

const Searchstyle = StyleSheet.create({
 Searchsection:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#eae3bb",
    paddingVertical:10,
    paddingLeft:30,
    gap:20,
    paddingRight:16,
    borderRadius:32
 }
})