import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import MultiSlider from "@ptomasroos/react-native-multi-slider";

const cakeCategories = [
  {
    id: 1,
    title: "Birthday Cake",
  },
  {
    id: 2,
    title: "Wedding Cake",
  },
  {
    id: 3,
    title: "Chocolate",
  },
  {
    id: 4,
    title: "Fruit Cake",
  },
  {
    id: 5,
    title: "Cupcakes",
  },
];

const RefineScreen = () => {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <Text style={styles.headerText}>
          Refine Search
        </Text>

      </View>

      {/* Price Range */}
      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          PRICE RANGE
        </Text>

        <MultiSlider
          values={[25, 150]}
          min={0}
          max={200}
          sliderLength={260}
          selectedStyle={{
            backgroundColor: "#7b645f",
          }}
          unselectedStyle={{
            backgroundColor: "#ddd5bb",
          }}
          markerStyle={{
            backgroundColor: "#8a6c67",
            borderWidth: 3,
            borderColor: "#fff",
            width: 18,
            height: 18,
          }}
          trackStyle={{
            height: 4,
            borderRadius: 10,
          }}
        />

        <View style={styles.priceWrapper}>

          <View style={styles.priceBox}>

            <Text style={styles.priceLabel}>
              Min
            </Text>

            <Text style={styles.priceText}>
              $25
            </Text>

          </View>

          <View style={styles.priceBox}>

            <Text style={styles.priceLabel}>
              Max
            </Text>

            <Text style={styles.priceText}>
              $150
            </Text>

          </View>

        </View>

      </View>

      {/* Categories */}
      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          CATEGORIES
        </Text>

        <FlatList
          data={cakeCategories}
          keyExtractor={(item) =>
            item.id.toString()
          }
          numColumns={2}
          columnWrapperStyle={{
            gap: 12,
            marginBottom: 12,
          }}
          renderItem={({ item, index }) => (

            <TouchableOpacity
              style={[
                styles.categoryBtn,
                index === 0 &&
                  styles.activeCategory,
              ]}
            >

              <Text
                style={[
                  styles.categoryText,
                  index === 0 &&
                    styles.activeText,
                ]}
              >
                {item.title}
              </Text>

            </TouchableOpacity>

          )}
        />

      </View>

    </View>
  );
};

export default RefineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5eed8",
    paddingTop: 20,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6dcc0",
    paddingBottom: 18,
  },

  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#7b645f",
  },

  section: {
    marginTop: 28,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#7b645f",
    marginBottom: 20,
  },

  priceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    paddingHorizontal: 8,
  },

  priceBox: {
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  priceLabel: {
    fontSize: 14,
    color: "#a29388",
  },

  priceText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4b3d39",
  },

  categoryBtn: {
    backgroundColor: "#efd7df",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    flex: 1,
  },

  activeCategory: {
    backgroundColor: "#7b645f",
  },

  categoryText: {
    fontSize: 16,
    color: "#7b645f",
    fontWeight: "500",
    textAlign: "center",
  },

  activeText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
});