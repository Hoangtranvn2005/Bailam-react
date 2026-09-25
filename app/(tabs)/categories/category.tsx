import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";

import { API_URL, Book } from "@/Services/book-services";
import { colors, radii } from "@/constants/theme";

export default function BooksScreen() {
  // Lấy tham số category từ URL (nếu có)
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Hàm gọi API lấy danh sách sách từ Laravel

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

  // Lọc danh sách sách theo danh mục (nếu có chọn)
  const filteredBooks = books.filter((book) => book.category === category);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <Text style={styles.title}>Danh sách {category}</Text>
      </View>

      <Text style={styles.subtitle}>
        {category
          ? `Các cuốn sách thuộc thể loại ${category}.`
          : "Tất cả những cuốn sách dành cho bạn."}
      </Text>

      {/* <Pressable onPress={() => router.canGoBack} style={styles.backButton}>
        <Text style={styles.backText}>‹ Quay lại</Text>
      </Pressable> */}

      {filteredBooks.map((book) => (
        <Pressable
          key={book.id}
          style={styles.bookItem}
          onPress={() => router.push(`/book-detail/${book.id}`)}
        >
          <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
            <Image
              source={{ uri: book.image }}
              style={styles.bookImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.bookTitle}>{book.title}</Text>

            <Text style={styles.author}>{book.author}</Text>

            <View style={styles.category}>
              <Text style={styles.categoryText}>{book.category}</Text>
            </View>

            <Text style={styles.description} numberOfLines={2}>
              {book.description}
            </Text>
          </View>
        </Pressable>
      ))}

      {filteredBooks.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTtitle}>
            Chưa có sách nào thuộc danh mục này.
          </Text>
        </View>
      )}
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

  emptyContainer: {
    padding: 20,
    alignItems: "center",
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

  emptyTtitle: {
    color: colors.inkSoft,
    fontSize: 13,
  },

  subtitle: {
    color: colors.inkSoft,
    fontSize: 13,
    marginTop: 7,
    marginBottom: 25,
  },

  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.moss,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: colors.gold,
    fontFamily: "serif",
    fontSize: 23,
    fontWeight: "800",
  },

  backButton: {
    marginBottom: 20,
  },

  backText: {
    color: colors.moss,
    fontSize: 14,
    fontWeight: "700",
  },

  bookItem: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },

  bookImage: {
    width: 81,
    height: 114,
    borderRadius: 9,
  },

  cover: {
    width: 90,
    height: 125,
    borderRadius: 9,
    padding: 5,
    justifyContent: "flex-end",
  },

  coverText: {
    color: colors.white,
    fontFamily: "serif",
    fontSize: 14,
    fontWeight: "700",
  },

  info: {
    flex: 1,
    paddingLeft: 13,
  },

  bookTitle: {
    color: colors.ink,
    fontFamily: "serif",
    fontSize: 17,
    fontWeight: "700",
  },

  author: {
    color: colors.inkSoft,
    fontSize: 12,
    marginTop: 4,
  },

  category: {
    alignSelf: "flex-start",
    backgroundColor: "#E7EDE4",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
  },

  categoryText: {
    color: colors.moss,
    fontSize: 10,
    fontWeight: "700",
  },

  description: {
    color: colors.inkSoft,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
  },
});
