import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // expo install @expo/vector-icons
// If not using Expo, swap for react-native-vector-icons/Feather instead.

export default function DeliveryDetailsCard({
  eta = '45–60 mins',
  address = '42 Artisan Grove, West Hollywood, CA',
  onChangePress = () => {},
}) {
  return (
    <View style={styles.card}>
      {/* Top row: icon + delivery details */}
      <View style={styles.row}>
        <View style={styles.iconCircle}>
          <Feather name="truck" size={20} color="#3D3229" />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.label}>DELIVERY DETAILS</Text>
          <Text style={styles.value}>Estimated: {eta}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom row: ship to + change */}
      <View style={styles.shipRow}>
        <View style={styles.shipTextBlock}>
          <Text style={styles.label}>SHIP TO</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        <TouchableOpacity onPress={onChangePress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.changeLink}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDE6DA',
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginHorizontal: 16,
    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textBlock: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A8378',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2B241C',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE7DB',
    marginVertical: 16,
  },
  shipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  shipTextBlock: {
    flex: 1,
    paddingRight: 12,
  },
  address: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B241C',
    marginTop: 2,
  },
  changeLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C9932E',
  },
});