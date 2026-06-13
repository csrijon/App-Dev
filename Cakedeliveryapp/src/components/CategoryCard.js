import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

const CategoryCard = ({ title,id,setselectid,selectid}) => {



  return (
    <TouchableOpacity onPress={()=>setselectid(id)} style={[styles.card,{backgroundColor:selectid===id?'#fff':'#f4dce4'}]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    width: 120,
    borderRadius: 20,
    marginRight: 10,
    alignItems: "center",
    backgroundColor: "#f4dce4",
    flexWrap:"nowrap"
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    alignItems: "center",
  },
});