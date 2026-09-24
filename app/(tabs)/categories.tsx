import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { books } from "@/constants/books";
import { colors, radii } from "@/constants/theme";

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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.iconText}>M</Text>
        </View>
        <Text style={styles.title}>Danh mục sách</Text>
      </View>

      <Text style={styles.subtitle}>
        Lựa chọn thể loại sách yêu thích.
      </Text>

      <Pressable
        onPress={() => router.push("/")}
        style={styles.backButton}
      >
        <Text style={styles.backText}>‹ Quay lại</Text>
      </Pressable>

      <View style={styles.grid}>
        {categories.map((category) => {
          const count = books.filter(
            (book) => book.category === category
          ).length;

          return (
            <Pressable
              key={category}
              style={styles.card}
              onPress={() => router.push({
                pathname: "/(tabs)/books",
                params: { category },
              })}
            >
              <View style={styles.icon}>
                <Text style={styles.iconText}>{category.charAt(0)}</Text>
              </View>

              <Text style={styles.categoryName}>
                {category}
              </Text>

              <Text style={styles.count}>
                {count} cuốn sách
              </Text>
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