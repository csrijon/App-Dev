import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';

const Floatingfixedbutton = ({title,titletwo,onPress}) => {
    return (
        <View style={styles.bottomButtonContainer}>


            <TouchableOpacity style={styles.draftButton}>

                <Text style={styles.draftButtonText}>
                  {title}
                </Text>

            </TouchableOpacity>


            <TouchableOpacity
                // onPress={addCake}
                onPress={onPress}
                
                style={styles.catalogButton}
            >

                <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="#FFFFFF"
                    style={styles.checkIcon}
                />

                <Text style={styles.catalogButtonText}>
                    {titletwo}
                </Text>

            </TouchableOpacity>

        </View>
    )
}
export default Floatingfixedbutton

const styles = StyleSheet.create({
    bottomButtonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#F6F0DF",
        borderTopWidth: 1,
        borderTopColor: "#E9DFC0",
    },

    draftButton: {
        flex: 1,
        height: 56,
        backgroundColor: "#F2CDBF",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    draftButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#7A5C50",
    },

    catalogButton: {
        flex: 1,
        height: 56,
        backgroundColor: "#7A5C50",
        borderRadius: 28,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#4A3024",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 3,
    },

    catalogButtonDisabled: {
        backgroundColor: "#C2B49C",
        shadowOpacity: 0,
        elevation: 0,
    },

    checkIcon: {
        marginRight: 8,
    },

    catalogButtonText: {
        fontSize: 17,
        fontWeight: "700",
        color: "#FFFFFF",
    },

})