import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

// --- Reusable Notification Card Component ---
const NotificationCard = ({
  title,
  description,
  time,
  isUnread,
  type, // 'image' or 'icon'
  imageUri,
  badgeIcon,
  centerIcon,
}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      {/* Left side: Avatar/Icon */}
      <View style={styles.avatarContainer}>
        {type === "image" ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.avatarImage} />
            {badgeIcon && (
              <View style={styles.badgeContainer}>
                <Ionicons name={badgeIcon} size={10} color="#FFFFFF" />
              </View>
            )}
          </>
        ) : (
          <View style={styles.iconAvatar}>
            <Ionicons name={centerIcon} size={20} color="#5D4037" />
          </View>
        )}
      </View>

      {/* Right side: Content */}
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>{title}</Text>
          {isUnread && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.cardDescription}>{description}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};


// --- Main Screen Component ---
const NotificationsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerBlock}>
          <Text style={styles.eyebrowText}>STAY UPDATED</Text>
          <View style={styles.titleRowLayout}>
            <Text style={styles.pageTitle}>Notifications</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.markReadText}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Orders Section */}
        <Text style={styles.sectionTitle}>ORDERS</Text>

        {/* First Notification - Delivery (Image with badge) */}
        <NotificationCard
          title="Order Out for Delivery"
          description="Your Lavender Honey Cake is on its way to you! Our courier is approximately 10 minutes away."
          time="2 mins ago"
          isUnread={true}
          type="image"
          imageUri="https://images.unsplash.com/photo-1519869325930-281384150729?w=200"
          badgeIcon="car" // Using 'car' or 'bus' as a fallback for truck in standard Ionicons
        />

        {/* Second Notification - Payment (Icon) */}
        <NotificationCard
          title="Payment Successful"
          description="Transaction for order #GK-8829 has been processed. We're preparing your treats now."
          time="1 hour ago"
          isUnread={false}
          type="icon"
          centerIcon="checkmark-circle-outline"
        />
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9e8", // Warm, creamy background matching the image
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  
  // Header Styles
  headerBlock: {
    marginBottom: 32,
  },
  eyebrowText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#A89B8C",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  titleRowLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline", // Aligns the bottoms of the texts
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4A362B", // Deep brown
  },
  markReadText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5D4037",
    textDecorationLine: "underline",
  },

  // Section Styles
  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#A89B8C",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 16,
  },

  // Card Styles
  card: {
    flexDirection: "row",
    backgroundColor: "#F7F1E1", // Slightly darker/warmer tint than the background for contrast
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },
  
  // Avatar & Icon Styles
  avatarContainer: {
    marginRight: 16,
    position: "relative", // For positioning the badge
  },
  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#EAE0C8",
  },
  badgeContainer: {
    position: "absolute",
    bottom: -2,
    right: -4,
    backgroundColor: "#7B5A4E",
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F7F1E1", // Match card background to create a cutout effect
  },
  iconAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EAE0C8",
  },

  // Text Content Styles
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#5D4037",
    paddingRight: 10, // Prevent overlapping with dot
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5D4037",
  },
  cardDescription: {
    fontSize: 13,
    color: "#8A7466",
    lineHeight: 20,
    marginBottom: 12,
  },
  timeText: {
    fontSize: 11,
    color: "#A89B8C",
    fontWeight: "500",
  },
});