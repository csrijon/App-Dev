import { SafeAreaView } from "react-native-safe-area-context"
import { View, ScrollView, Text, TouchableOpacity } from "react-native"
import Detailsheader from "../Screen/Detailsheader.js"


const Checkoutscreen = () => {
    return (
        <SafeAreaView>
            <Detailsheader />
            <ScrollView vertical showsVerticalScrollIndicator={false} >
                <View>
                    <Text>YOUR CURATION</Text>
                    <Text>Your Basket</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Checkoutscreen