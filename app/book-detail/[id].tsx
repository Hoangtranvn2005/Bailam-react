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

import { API_URL } from "@/constants/api";
import { colors, radii } from "@/constants/theme";

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  coverColor: string;
  image: string;
}

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/books/${id}`, {
        headers: { Accept: "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "success") {
            setBook(result.data);
          }
        })
        .catch((err) => console.error("Lỗi lấy chi tiết sách:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.moss} />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.notFound}>
        <Text>Không tìm thấy sách.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
        <Image
          source={{ uri: book.image }}
          style={styles.bookImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>

      <View style={styles.category}>
        <Text style={styles.categoryText}>{book.category}</Text>
      </View>

      <Text style={styles.heading}>Giới thiệu</Text>
      <Text style={styles.description}>{book.description}</Text>

      <Pressable style={styles.readButton}>
        <Text style={styles.readText}>Đọc sách</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: colors.moss,
    fontSize: 14,
    fontWeight: "700",
  },
  cover: {
    width: 210,
    height: 290,
    borderRadius: 15,
    alignSelf: "center",
    padding: 5,
    justifyContent: "flex-end",
    marginBottom: 25,
  },
  bookImage: {
    width: 200,
    height: 279,
    borderRadius: 15,
  },
  title: {
    color: colors.ink,
    fontFamily: "serif",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
  },
  author: {
    color: colors.inkSoft,
    fontSize: 13,
    marginTop: 6,
  },
  category: {
    alignSelf: "flex-start",
    backgroundColor: "#E7EDE4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 12,
  },
  categoryText: {
    color: colors.moss,
    fontSize: 11,
    fontWeight: "700",
  },
  heading: {
    color: colors.ink,
    fontFamily: "serif",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 9,
  },
  description: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 22,
  },
  readButton: {
    height: 54,
    backgroundColor: colors.moss,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  readText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});