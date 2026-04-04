import { View, Text, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Detailsheader from "../components/Detailsheader";


const CakeDetails = () => {
    return (
        <SafeAreaView style={styles.CakeDetails} >
            <StatusBar backgroundColor="#fcf5e3" barStyle="dark-content" />
            <View>
                <Detailsheader />
                <Text>Cake Details</Text>
            </View>
        </SafeAreaView>
    )
}
export default CakeDetails;

const styles = StyleSheet.create({
    CakeDetails: {
        flex: 1,
        backgroundColor: "#fcf5e3",
    }
})