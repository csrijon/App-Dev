import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput,Image } from "react-native"
import Simpleheader from "../components/Simpleheader"
import { useState } from "react"
import CategoryCard from "../components/CategoryCard"
import Ionicons from "react-native-vector-icons/Ionicons";


const Customorderpage = () => {

    const [cakeweight, setcakeweight] = useState(null)

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
                        <TouchableOpacity onPress={() => setcakeweight(!cakeweight)} style={[styles.cakeweightcard, { backgroundColor: cakeweight ? "#f6cfc2" : "white" }]} >
                            <Text style={styles.cakeweight} >2 lb</Text>
                            <Text style={styles.servetext} >Serves 4-6</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cakeweightcard} >
                            <Text style={styles.cakeweight} >5 lb</Text>
                            <Text style={styles.servetext} >Serves 12-15</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cakeweightcard} >
                            <Text style={styles.cakeweight} >10 lb</Text>
                            <Text style={styles.servetext} >Serves 25+</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                {/* {end select cake Weight} */}

                {/* {start Flavor profile} */}
                <View style={styles.flavorsection} >
                    <Text style={styles.flavortext}  >Choose Flavor Profile</Text>
                    <View style={styles.flavorcardsection} >
                        <CategoryCard title="Vanilla Bean" />
                        <CategoryCard title="Belgian Chocolate" />
                        <CategoryCard title="Red Velvet" />
                        <CategoryCard title="Lemon Zest" />
                    </View>
                </View>
                {/* {end Flavor profile} */}
                {/* start image picker */}
                <View style={styles.uploadcontainer}>

                    {/* Title */}
                    <Text style={styles.heading}>Reference Image</Text>

                    {/* Card */}
                    <View style={styles.card}>

                        {/* Icon Circle */}
                        <View style={styles.iconWrapper}>
                            <Ionicons name="camera-outline" size={24} color="#6b4f4f" />
                        </View>

                        {/* Text */}
                        <Text style={styles.title}>Upload an Inspiration Image</Text>
                        <Text style={styles.subtitle}>
                            Share your vision with our pastry chefs (JPG, PNG)
                        </Text>

                    </View>

                </View>
                {/* {end image picker} */}

                {/* {start text input section} */}
                <View style={styles.rareWrapper}>

                    {/* Title */}
                    <Text style={styles.rareHeading}>Message on Cake</Text>

                    {/* Input Box */}
                    <TextInput
                        placeholder="E.g., Happy 25th Birthday, Julia!"
                        placeholderTextColor="#363317"
                        multiline
                        style={styles.ghostInputField}
                    />

                </View>

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
      <TouchableOpacity style={styles.ctaBar}>
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
        gap: 10
    },
    flavortext: {
        color: "#75584e",
        fontSize: 18,
        fontWeight: 700
    },
    uploadcontainer: {
        // paddingHorizontal: 20,
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
     rareWrapper: {
    marginTop: 20,
  },

  rareHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#75584e",
    marginBottom: 10,
  },
  ghostInputField: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    height: 120,
    textAlignVertical: "top", 
    color: "#363317",
  },
  velvetShell: {
    paddingVertical:20
    // backgroundColor: "#f5ecd9",
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
    zIndex:9999
  },

  ctaBar: {
    backgroundColor: "#6b4f4f",
    marginTop: -25,
    position:"absolute",
    bottom:20,
    left:0,
    right:0,
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