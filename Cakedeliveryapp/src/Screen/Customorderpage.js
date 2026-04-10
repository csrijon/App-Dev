import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, StyleSheet,View,Text } from "react-native"
import Simpleheader from "../components/Simpleheader"


const Customorderpage = () => {
    return (
        <SafeAreaView style={styles.maincustomorderpage} >
            <StatusBar backgroundColor="#FFF9E6" barStyle="dark-content" />
            <Simpleheader />
            <ScrollView vartical showsVerticalScrollIndicator={false} style={styles.scrollcustomorderpage} >
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
                    <View style={styles.cakeweightcard} >
                        <Text style={styles.cakeweight} >2 lb</Text>
                        <Text style={styles.servetext} >Serves 4-6</Text>
                    </View>

                     <View style={styles.cakeweightcard} >
                        <Text style={styles.cakeweight} >5 lb</Text>
                        <Text>Serves 12-15</Text>
                    </View>

                  <View style={styles.cakeweightcard} >
                        <Text style={styles.cakeweight} >10 lb</Text>
                        <Text>Serves 25+</Text>
                    </View>

                </View>
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
        paddingTop:30,
        padding:20,
    },
    customfirsttext:{
        gap:10,
    },
    textmasterpiece:{
        fontSize:25,
        fontWeight:800,
        lineHeight:36,
        letterSpacing:1,
        color:"#75584e"
    },
    smalltextmasterpiece:{
        color:"#646040",
        fontSize:16
    },
    weightcakesection:{
        marginVertical:25
    },
    cakeweighttext:{
        color:"#75584e",
        fontSize:18,
        fontWeight:700,
        marginBottom:15
    },
    weightcardsection:{
       gap:10,
       flexDirection:"row"
    },
    cakeweightcard:{
        width:100,
        height:100,
        backgroundColor:"white",
        padding:20,
        borderWidth:2,
        borderColor:"#f6cfc2",
        borderRadius:40
    },
    cakeweight:{
        color:"#75584e",
        fontSize:24,
        fontWeight:700,
        textAlign:"center"
    },
    servetext:{
        fontSize:12,
        color:"#646040",
        fontWeight:500,
        textAlign:"center",
        lineHeight:16,
        letterSpacing:1
    }
})