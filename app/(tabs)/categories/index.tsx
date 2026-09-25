import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";

import { colors, radii } from "@/constants/theme";
import { API_URL } from "@/Services/book-services";
import type { Book } from "@/Services/book-services";

const categories = [
  "Tiểu thuyết",
  "Kỹ năng sống",
  "Phát triển bản thân",
  "Tâm lý",
  "Kinh doanh",
  "Trinh thám",
  "Light Novel",
];

export default function CategoriesScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/books`, {
          headers: {
            Accept: "application/json",
          },
        });
        const result = await response.json();

        if (result.status === "success") {
          setBooks(result.data); // Gán dữ liệu trả về từ Laravel vào state
        }
      } catch (error) {
        console.error("Lỗi kết nối API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.moss} />
        <Text style={styles.loadingText}>Đang tải dữ liệu từ server...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.iconText}>M</Text>
        </View>
        <Text style={styles.title}>Danh mục sách</Text>
      </View>

      <Text style={styles.subtitle}>Lựa chọn thể loại sách yêu thích.</Text>

      <View style={styles.grid}>
        {categories.map((category) => {
          const count = books.filter(
            (book) => book.category === category,
          ).length;

          return (
            <Pressable
              key={category}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/categories/category",
                  params: { category },
                })
              }
            >
              <View style={styles.icon}>
                <Text style={styles.iconText}>{category.charAt(0)}</Text>
              </View>

              <Text style={styles.categoryName}>{category}</Text>

              <Text style={styles.count}>{count} cuốn sách</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.paper,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: colors.inkSoft,
  },

  header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 1,
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    color: colors.ink,
    fontFamily: "serif",
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.inkSoft,
    fontSize: 13,
    marginTop: 7,
    marginBottom: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  card: {
    width: "47%",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.moss,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.moss,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  iconText: {
    color: colors.gold,
    fontFamily: "serif",
    fontSize: 18,
    fontWeight: "800",
  },

  categoryName: {
    color: colors.ink,
    fontFamily: "serif",
    fontSize: 15,
    fontWeight: "700",
  },

  count: {
    color: colors.inkSoft,
    fontSize: 11,
    marginTop: 5,
  },

  backButton: {
    marginBottom: 20,
  },

  backText: {
    color: colors.moss,
    fontSize: 14,
    fontWeight: "700",
  },
});
