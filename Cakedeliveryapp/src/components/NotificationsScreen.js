import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { notifications } from '../services/customerApi';

const NotificationCard = ({ title, description, time, isUnread }) => {
  return (
    <TouchableOpacity style={[styles.card, isUnread && styles.unreadCard]} activeOpacity={0.8}>
      <View style={styles.iconAvatar}>
        <Ionicons name="notifications-outline" size={20} color="#5D4037" />
      </View>
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

const NotificationsScreen = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await notifications.list();
      if (res && res.success && Array.isArray(res.data)) {
        const mapped = res.data.map((n) => ({
          id: String(n.id),
          title: n.title || "Notification",
          description: n.message || "",
          time: n.createdAt ? new Date(n.createdAt).toLocaleString() : "Just now",
          isUnread: !n.isRead,
        }));
        setNotificationData(mapped);
      } else {
        setNotificationData([]);
      }
    } catch (e) {
      console.log("Notification fetch error:", e);
      setNotificationData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.headerBlock}>
          <Text style={styles.eyebrowText}>STAY UPDATED</Text>
          <View style={styles.titleRowLayout}>
            <Text style={styles.pageTitle}>Notifications</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ORDERS</Text>

        {loading && notificationData.length === 0 ? (
          <ActivityIndicator size="large" color="#75584e" style={{ marginTop: 40 }} />
        ) : notificationData.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-outline" size={48} color="#D8C9C4" />
            <Text style={styles.emptyText}>No notifications yet.</Text>
          </View>
        ) : (
          notificationData.map((item) => (
            <NotificationCard
              key={item.id}
              title={item.title}
              description={item.description}
              time={item.time}
              isUnread={item.isUnread}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9e8",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
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
    alignItems: "baseline",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4A362B",
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#A89B8C",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F7F1E1",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },
  unreadCard: {
    backgroundColor: "#FCFAEF",
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
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#5D4037",
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
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: "#A8A085",
    fontWeight: "500",
  },
});
