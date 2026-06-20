import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert } from "react-native"
import Simpleheader from "../components/Simpleheader"
import { useState } from "react"
import CategoryCard from "../components/CategoryCard"
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from 'react-native-image-picker';

const Customorderpage = ({ navigation }) => {

    const weightOptions = [
        { id: 1, weight: "2 lb", serves: "Serves 4-6", price: 30 },
        { id: 2, weight: "5 lb", serves: "Serves 12-15", price: 65 },
        { id: 3, weight: "10 lb", serves: "Serves 25+", price: 120 },
    ];

    const flavorOptions = [
        { id: 1, title: "Vanilla Bean" },
        { id: 2, title: "Belgian Chocolate" },
        { id: 3, title: "Red Velvet" },
        { id: 4, title: "Lemon Zest" },
    ];

    const [selectedWeight, setSelectedWeight] = useState(null);
    const [selectedFlavorId, setSelectedFlavorId] = useState(null);
    const [cakeMessage, setCakeMessage] = useState("");
    const [referenceImage, setReferenceImage] = useState(null);

    const MAX_MESSAGE_LENGTH = 60;

    const handlePickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.7,
                selectionLimit: 1,
            },
            (response) => {
                if (response.didCancel) {
                    return;
                }
                if (response.errorCode) {
                    Alert.alert(
                        "Error",
                        response.errorMessage || "Something went wrong while picking the image."
                    );
                    return;
                }
                if (response.assets && response.assets.length > 0) {
                    setReferenceImage(response.assets[0].uri);
                }
            }
        );
    };

    const handleRemoveImage = () => {
        setReferenceImage(null);
    };

    const estimatedPrice = selectedWeight ? selectedWeight.price : 0;

    const selectedFlavorTitle = flavorOptions.find(f => f.id === selectedFlavorId)?.title || null;

    const handleNext = () => {
        if (!selectedWeight) {
            Alert.alert("Select Weight", "Please select a cake weight &  to continue.");
            return;
        }
        if (!selectedFlavorId) {
            Alert.alert("Select Flavor", "Please choose a flavor profile to continue.");
            return;
        }

        navigation.navigate("Datetimeselection", {
            weight: selectedWeight,
            flavor: selectedFlavorTitle,
            message: cakeMessage,
            referenceImage,
            estimatedPrice,
        });
    };

    return (
        <SafeAreaView style={styles.maincustomorderpage} >
            <StatusBar backgroundColor="#FFF9E6" barStyle="dark-content" />
            <Simpleheader />
            <ScrollView contentContainerStyle={{paddingBottom:40}} vartical showsVerticalScrollIndicator={false} style={styles.scrollcustomorderpage} >
                {/* {top page text start} */}
                <View style={styles.customfirsttext} >
                    <Text style={styles.textmasterpiece} >Design Your Masterpiece</Text>
                    <Text style={styles.smalltextmasterpiece} >Every great celebrationc begins with a custom creation from Cake Haven</Text>
                </View>
                {/* {top page text end} */}

                {/* {start select cake Weight} */}
                <View style={styles.weightcakesection} >
                    <Text style={styles.cakeweighttext} >Select Cake Weight</Text>
                    {/* {start cake weight card} */}
                    <View style={styles.weightcardsection} >
                        {weightOptions.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                onPress={() => setSelectedWeight(option)}
                                activeOpacity={0.7}
                                style={[
                                    styles.cakeweightcard,
                                    { backgroundColor: selectedWeight?.id === option.id ? "#f6cfc2" : "white" }
                                ]}
                            >
                                <Text style={styles.cakeweight} >{option.weight}</Text>
                                <Text style={styles.servetext} >{option.serves}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {/* {end select cake Weight} */}

                {/* {start Flavor profile} */}
                <View style={styles.flavorsection} >
                    <Text style={styles.flavortext}  >Choose Flavor Profile</Text>
                    <View style={styles.flavorcardsection} >
                        {flavorOptions.map((flavor) => (
                            <CategoryCard
                                key={flavor.id}
                                id={flavor.id}
                                title={flavor.title}
                                selectid={selectedFlavorId}
                                setselectid={setSelectedFlavorId}
                            />
                        ))}
                    </View>
                </View>
                {/* {end Flavor profile} */}

                {/* start image picker */}
                <View style={styles.uploadcontainer}>

                    {/* Title */}
                    <Text style={styles.heading}>Reference Image</Text>

                    {referenceImage ? (
                        <View style={styles.imagePreviewWrapper}>
                            <Image source={{ uri: referenceImage }} style={styles.previewImage} />
                            <TouchableOpacity style={styles.removeImageBtn} onPress={handleRemoveImage}>
                                <Ionicons name="close-circle" size={26} color="#6b4f4f" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.changeImageBtn} onPress={handlePickImage}>
                                <Text style={styles.changeImageText}>Change Image</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.card} onPress={handlePickImage} activeOpacity={0.7}>

                            {/* Icon Circle */}
                            <View style={styles.iconWrapper}>
                                <Ionicons name="camera-outline" size={24} color="#6b4f4f" />
                            </View>

                            {/* Text */}
                            <Text style={styles.title}>Upload an Inspiration Image</Text>
                            <Text style={styles.subtitle}>
                                Share your vision with our pastry chefs (JPG, PNG)
                            </Text>

                        </TouchableOpacity>
                    )}

                </View>
                {/* {end image picker} */}

                {/* {start text input section} */}
                <View style={styles.rareWrapper}>

                    {/* Title */}
                    <View style={styles.messageHeadingRow}>
                        <Text style={styles.rareHeading}>Message on Cake</Text>
                        <Text style={styles.charCount}>
                            {cakeMessage.length}/{MAX_MESSAGE_LENGTH}
                        </Text>
                    </View>

                    {/* Input Box */}
                    <TextInput
                        placeholder="E.g., Happy 25th Birthday, Julia!"
                        placeholderTextColor="#9a8f7a"
                        multiline
                        style={styles.ghostInputField}
                        value={cakeMessage}
                        onChangeText={(text) => {
                            if (text.length <= MAX_MESSAGE_LENGTH) {
                                setCakeMessage(text);
                            }
                        }}
                        maxLength={MAX_MESSAGE_LENGTH}
                    />

                </View>

                {/* {start price estimate} */}
                {selectedWeight && (
                    <View style={styles.priceEstimateBox}>
                        <Text style={styles.priceEstimateLabel}>Estimated Price</Text>
                        <Text style={styles.priceEstimateValue}>${estimatedPrice}</Text>
                    </View>
                )}
                {/* {end price estimate} */}

                <View style={styles.velvetShell}>

                    {/* Background Card */}
                    <View style={styles.blushCanvas}>

                        {/* Tag */}
                        <View style={styles.ribbonTag}>
                            <Text style={styles.ribbonText}>CURATED CHOICE</Text>
                        </View>

                        {/* Text Content */}
                        <View style={styles.copyZone}>
                            <Text style={styles.heroTitle}>
                                Our Signature{"\n"}Belgian{"\n"}Chocolate Base
                            </Text>

                            <Text style={styles.heroSub}>
                                Rich 70% dark chocolate sponge with silky ganache
                            </Text>
                        </View>

                        {/* Image */}
                        <Image
                            source={require("../images/cakeimage.jpeg")}
                            style={styles.floatingCake}
                        />
                    </View>

                    {/* Bottom Button */}
                    <TouchableOpacity style={styles.ctaBar} onPress={handleNext}>
                        <Text style={styles.ctaText}>Next: Date & Time →</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Customorderpage

const styles = StyleSheet.create({
    maincustomorderpage: {
        flex: 1,
        backgroundColor: "#fff9e6",

    },
    scrollcustomorderpage: {
        flex: 1,
        paddingTop: 30,
        padding: 20,
    },
    customfirsttext: {
        gap: 10,
    },
    textmasterpiece: {
        fontSize: 25,
        fontWeight: 800,
        lineHeight: 36,
        letterSpacing: 1,
        color: "#75584e"
    },
    smalltextmasterpiece: {
        color: "#646040",
        fontSize: 16
    },
    weightcakesection: {
        marginVertical: 25
    },
    cakeweighttext: {
        color: "#75584e",
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 15
    },
    weightcardsection: {
        gap: 10,
        flexDirection: "row"
    },
    cakeweightcard: {
        width: 100,
        height: 100,
        backgroundColor: "white",
        padding: 20,
        borderWidth: 2,
        borderColor: "#f6cfc2",
        borderRadius: 40
    },
    cakeweight: {
        color: "#75584e",
        fontSize: 24,
        fontWeight: 700,
        textAlign: "center"
    },
    servetext: {
        fontSize: 12,
        color: "#646040",
        fontWeight: 500,
        textAlign: "center",
        lineHeight: 16,
        letterSpacing: 1
    },
    flavorsection: {
        gap: 12
    },
    flavorcardsection: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    flavortext: {
        color: "#75584e",
        fontSize: 18,
        fontWeight: 700
    },
    uploadcontainer: {
        marginTop: 20,
    },

    heading: {
        fontSize: 18,
        fontWeight: 700,
        color: "#75584e",
        marginBottom: 20,
    },

    card: {
        borderWidth: 1.5,
        borderStyle: "dashed",
        borderColor: "#cbbfa2",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5ecd9",
    },

    iconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#f3d9dc",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#5c4033",
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 12,
        color: "#8b7d6b",
        textAlign: "center",
        lineHeight: 18,
    },

    imagePreviewWrapper: {
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#f5ecd9",
        position: "relative",
    },

    previewImage: {
        width: "100%",
        height: 200,
        borderRadius: 20,
    },

    removeImageBtn: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
    },

    changeImageBtn: {
        backgroundColor: "#6b4f4f",
        paddingVertical: 10,
        alignItems: "center",
    },

    changeImageText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },

    rareWrapper: {
        marginTop: 20,
    },

    messageHeadingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    rareHeading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#75584e",
    },

    charCount: {
        fontSize: 12,
        color: "#8b7d6b",
    },

    ghostInputField: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 20,
        height: 120,
        textAlignVertical: "top",
        color: "#363317",
    },

    priceEstimateBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f3e8d9",
        borderRadius: 20,
        padding: 18,
        marginTop: 20,
    },

    priceEstimateLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#75584e",
    },

    priceEstimateValue: {
        fontSize: 20,
        fontWeight: "800",
        color: "#6b4f4f",
    },

    velvetShell: {
        paddingVertical: 20
    },

    blushCanvas: {
        backgroundColor: "#e9bfb3",
        borderRadius: 30,
        padding: 20,
        overflow: "hidden",
        position: "relative",
    },

    ribbonTag: {
        backgroundColor: "#d9a3b0",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 10,
    },

    ribbonText: {
        fontSize: 10,
        fontWeight: "600",
        color: "#5c4033",
    },

    copyZone: {
        width: "65%",
    },

    heroTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5c4033",
        marginBottom: 8,
    },

    heroSub: {
        fontSize: 12,
        color: "#6e5a4f",
    },

    floatingCake: {
        position: "absolute",
        right: -20,
        bottom: -20,
        width: 180,
        height: 180,
        borderRadius: 100,
        zIndex: 9999
    },

    ctaBar: {
        backgroundColor: "#6b4f4f",
        marginTop: -25,
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        padding: 18,
        borderRadius: 30,
        alignItems: "center",
    },

    ctaText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },

})