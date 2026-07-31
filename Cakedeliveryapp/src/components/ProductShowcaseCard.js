import { View, StyleSheet, Image, TouchableOpacity, Text, useWindowDimensions } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductShowcaseCard = ({ title, des, price, rating, badge, image, }) => {
    const { width, height } = useWindowDimensions()
    const cardwidth = (width - 48) / 2
    return (
        <View style={[styles.ProductShowcaseCard, { width: cardwidth }]} >
            <View style={styles.imageproductsection} >
                <Image style={styles.imagetag} source={{ uri: image }} />
                <TouchableOpacity style={styles.heartButton}>
                    <AntDesign name="hearto" color="#000" size={18} />
                </TouchableOpacity>
                <View style={styles.signatureBadge}>
                    <Text style={styles.signatureText}>{badge}</Text>
                </View>
            </View>
            <View style={styles.textproduuctsection} >
                <View style={styles.ratingRow}>
                    <AntDesign name="star" color="#D4A017" size={14} />
                    <Text style={styles.ratingText}>{rating}</Text>
                </View>
                <Text style={styles.titleText}>Velvet Cocoa</Text>
                <Text style={styles.descriptionText}>
                    {des}
                </Text>
                <View style={styles.priceRow}>
                    <Text style={styles.priceText}>${price}</Text>
                    <TouchableOpacity style={styles.plusButton}>
                        <AntDesign name="plus" color="#fff" size={18} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProductShowcaseCard

const styles = StyleSheet.create({
    ProductShowcaseCard: {
        borderRadius: 16,
        position: "relative",
        overflow: "hidden",
        // marginTop: 12
    },
    imageproductsection: {
        position: "relative",
    },
    imagetag: {
        width: "100%",
        height: 190,
        resizeMode: "cover",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    heartButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(255,255,255,0.85)",
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    signatureBadge: {
        position: "absolute",
        bottom: 10,
        left: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    signatureText: {
        fontSize: 10,
        fontWeight: "600",
        letterSpacing: 1,
        color: "#333",
    },
    textproduuctsection: {
        paddingHorizontal: 12,
        paddingTop: 10,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 6,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#333",
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2b1b12",
        marginBottom: 4,
    },
    descriptionText: {
        fontSize: 12,
        color: "#7a6a5a",
        lineHeight: 16,
        marginBottom: 10,
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    priceText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2b1b12",
    },
    plusButton: {
        backgroundColor: "#4a2b1e",
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
})