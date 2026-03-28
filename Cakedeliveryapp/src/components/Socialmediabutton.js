import { TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const Socialmediabutton = () => {
  return (
    <View>
      <TouchableOpacity>
        <Ionicons name="logo-google" color="#000" size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <SimpleLineIcons name="social-linkedin" color="#000" size={24} />
      </TouchableOpacity>
    </View>
  
  );
};

export default Socialmediabutton;