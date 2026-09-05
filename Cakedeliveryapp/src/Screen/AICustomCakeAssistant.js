import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from "react-native";

const AICustomCakeAssistant = ({ navigation }) => {
  const [req, setReq] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
      <Text style={styles.title}>AI Cake Assistant</Text>
      <Text style={styles.subtitle}>Describe your dream cake in natural language.</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., I need a pink 2kg vanilla eggless cake for a birthday..."
        value={req}
        onChangeText={setReq}
        multiline
      />
      <TouchableOpacity style={styles.btn}
        onPress={() => navigation.navigate("Customorder", { aiRequirement: req })}
        activeOpacity={0.85}>
        <Text style={styles.btnText}>Generate Custom Request</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AICustomCakeAssistant;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff9e6", padding: 24 },
  title: { fontSize: 24, fontWeight: "800", color: "#5C3D2E" },
  subtitle: { fontSize: 14, color: "#8B7055", marginVertical: 10 },
  input: { backgroundColor: "#fff", borderRadius: 16, padding: 16, minHeight: 120, textAlignVertical: "top", fontSize: 15, borderWidth: 1, borderColor: "#E0D5BE" },
  btn: { backgroundColor: "#6b4f4f", borderRadius: 16, paddingVertical: 16, alignItems: "center", marginTop: 20 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
