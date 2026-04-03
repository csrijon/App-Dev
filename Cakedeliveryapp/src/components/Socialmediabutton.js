import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Socialmediabutton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="logo-google" color="#000" size={24} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <SimpleLineIcons name="social-linkedin" color="#000" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Socialmediabutton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',   
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15, 
  },
  button: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});