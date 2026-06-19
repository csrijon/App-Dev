import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CategoryCard = ({ title, id, setselectid, selectid }) => {

  const isSelected = selectid === id;

  return (
    <TouchableOpacity
      onPress={() => setselectid(id)}
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? "#fff" : "#f4dce4",
          borderColor: isSelected ? "#6b4f4f" : "#f4dce4",
        },
      ]}
    >
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={16}
          color="#6b4f4f"
          style={styles.checkIcon}
        />
      )}
      <Text
        style={[
          styles.text,
          { color: isSelected ? "#5c4033" : "#75584e" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 18,
    width: 150,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4dce4",
    borderWidth: 1.5,
    flexWrap: "nowrap",
  },
  checkIcon: {
    marginRight: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});