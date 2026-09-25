import { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii } from "@/constants/theme";
import { API_URL, Book } from "@/Services/book-services";

export default function HomeScreen() {
  const categories = [
    "Tiểu thuyết",
    "Kỹ năng sống",
    "Tâm lý",
    "Phát triển bản thân",
    "Light Novel",
  ];

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Hàm gọi API lấy danh sách sách từ Laravel

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/books`, {
          headers: { Accept: "application/json" },
        });
        const result = await response.json();

        if (result.status === "success") {
          setBooks(result.data);
        }
      } catch (error) {
        console.error("Lỗi kết nối API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const sectionData = [
    {
      title: selectedCategory,
      data: books.filter((book) => book.category === selectedCategory),
    },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.moss} />
        <Text style={styles.loadingText}>Đang tải dữ liệu từ server...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>M</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Chào mừng bạn đến với</Text>
              <Text style={styles.brand}>Mộc Thư</Text>
            </View>
          </View>

          <Pressable
            style={styles.searchToggleButton}
            onPress={() => {
              setShowSearch(!showSearch);
              if (showSearch) setSearchQuery("");
            }}
          >
            <Text style={styles.searchToggleText}>
              {showSearch ? "✕" : "🔍"}
            </Text>
          </Pressable>
        </View>

        {showSearch && (
          <View style={styles.searchSection}>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Nhập tên sách..."
                placeholderTextColor={colors.inkSoft}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              <Pressable style={styles.advancedSearchButton} onPress={() => {}}>
                <Text style={styles.advancedSearchText}>Tìm kiếm nâng cao</Text>
              </Pressable>
            </View>

            {searchQuery.trim().length > 0 && (
              <View style={styles.searchResults}>
                <Text style={styles.searchResultsTitle}>
                  Kết quả tìm kiếm ({filteredBooks.length}):
                </Text>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <Pressable
                      key={book.id}
                      style={styles.searchResultItem}
                      onPress={() => router.push(`/book-detail/${book.id}`)}
                    >
                      <Image
                        source={{ uri: book.image }}
                        style={styles.searchResultImage}
                        resizeMode="cover"
                      />
                      <View style={styles.searchResultInfo}>
                        <Text
                          style={styles.searchResultTitle}
                          numberOfLines={1}
                        >
                          {book.title}
                        </Text>
                      </View>
                    </Pressable>
                  ))
                ) : (
                  <Text style={styles.noResultsText}>
                    Không tìm thấy sách phù hợp.
                  </Text>
                )}
              </View>
            )}
          </View>
        )}

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Khám phá thế giới{"\n"}qua từng trang sách.
          </Text>
          <Text style={styles.bannerText}>
            Đọc những câu chuyện truyền cảm hứng mỗi ngày.
          </Text>
        </View>

        {/* Đọc gần đây */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Đọc gần đây</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={books.slice(0, 3)}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.bookList}
          renderItem={({ item: book }) => (
            <Pressable
              style={styles.bookCard}
              onPress={() => router.push(`/book-detail/${book.id}`)}
            >
              <View
                style={[styles.bookCover, { backgroundColor: book.coverColor }]}
              >
                <Image
                  source={{ uri: book.image }}
                  style={styles.bookImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.bookTitle} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={styles.author}>{book.author}</Text>
            </Pressable>
          )}
        />

        {/* Sách mới nhất */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sách mới nhất</Text>
          <Pressable onPress={() => router.push("/(tabs)/books")}>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </Pressable>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={books.slice(0, 5)}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.bookList}
          renderItem={({ item: book }) => (
            <Pressable
              key={book.id}
              style={styles.bookCard}
              onPress={() => router.push(`/book-detail/${book.id}`)}
            >
              <View
                style={[styles.bookCover, { backgroundColor: book.coverColor }]}
              >
                <Image
                  source={{ uri: book.image }}
                  style={styles.bookImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.bookTitle} numberOfLines={1}>
                {book.title}
              </Text>
              <Text style={styles.author} numberOfLines={1}>
                {book.author}
              </Text>
            </Pressable>
          )}
        />

        {/* Sách thịnh hành */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thịnh hành</Text>

          <Pressable onPress={() => router.push("/books")}>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </Pressable>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={books.slice(4, 8)}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.bookList}
          renderItem={({ item: book }) => (
            <Pressable
              key={book.id}
              style={styles.bookCard}
              onPress={() => router.push(`/book-detail/${book.id}`)}
            >
              <View
                style={[styles.bookCover, { backgroundColor: book.coverColor }]}
              >
                <Image
                  source={{ uri: book.image }}
                  style={styles.bookImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.bookTitle} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={styles.author}>{book.author}</Text>
            </Pressable>
          )}
        />

        {/* Danh mục */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Danh mục sách</Text>
          <Pressable onPress={() => router.push("/(tabs)/categories")}>
            <Text style={styles.seeAll}>Xem thêm</Text>
          </Pressable>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item: category }) => {
            const isSelected = category === selectedCategory;
            return (
              <Pressable
                style={[
                  styles.categoryItem,
                  isSelected && styles.categoryItemSelected,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          }}
        />

        <SectionList
          scrollEnabled={false}
          sections={sectionData}
          keyExtractor={(item) => item.id.toString()}
          style={styles.sectionListContainer}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionListHeader}>
              Danh mục: {title} ({sectionData[0].data.length} sách)
            </Text>
          )}
          renderItem={({ item: book }) => (
            <Pressable
              key={book.id}
              style={styles.sectionBookItem}
              onPress={() => router.push(`/book-detail/${book.id}`)}
            >
              <Image
                source={{ uri: book.image }}
                style={styles.sectionBookImage}
                resizeMode="cover"
              />
              <View style={styles.sectionBookInfo}>
                <Text style={styles.sectionBookTitle}>{book.title}</Text>
                <Text style={styles.sectionBookAuthor}>{book.author}</Text>
                <Text style={styles.sectionBookDesc} numberOfLines={2}>
                  {book.description}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.paper,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  greeting: {
    color: colors.inkSoft,
    fontSize: 13,
  },
  brand: {
    color: colors.ink,
    fontFamily: "serif",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 1,
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
  banner: {
    backgroundColor: colors.moss,
    borderRadius: radii.lg,
    padding: 22,
    marginBottom: 30,
  },
  bannerTitle: {
    color: colors.white,
    fontFamily: "serif",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "700",
  },
  bannerText: {
    color: "#E5ECE3",
    fontSize: 13,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 2,
    borderColor: colors.border,
    marginBottom: 15,
    paddingTop: 10,
  },
  sectionTitle: {
    color: colors.ink,
    fontFamily: "serif",
    fontSize: 20,
    fontWeight: "700",
  },
  seeAll: {
    color: colors.moss,
    fontSize: 12,
    fontWeight: "700",
  },
  bookList: {
    gap: 15,
    paddingBottom: 30,
  },
  bookCard: {
    width: 130,
  },
  bookImage: {
    width: 121,
    height: 168,
    borderRadius: 12,
  },
  bookCover: {
    width: 130,
    height: 180,
    borderRadius: 12,
    padding: 5,
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  bookTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  author: {
    color: colors.inkSoft,
    fontSize: 11,
    marginTop: 4,
  },
  categoryList: {
    gap: 5,
    paddingBottom: 15,
  },
  categoryItem: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  categoryItemSelected: {
    backgroundColor: colors.moss,
    borderColor: colors.moss,
  },
  categoryText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "600",
  },
  categoryTextSelected: {
    color: colors.white,
  },
  sectionListContainer: {
    marginBottom: 40,
  },
  sectionListHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.moss,
    marginBottom: 12,
    marginTop: 5,
  },
  sectionBookItem: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionBookImage: {
    width: 60,
    height: 85,
    borderRadius: 8,
  },
  sectionBookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  sectionBookTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  sectionBookAuthor: {
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 2,
  },
  sectionBookDesc: {
    fontSize: 11,
    color: colors.inkSoft,
    marginTop: 4,
  },
  searchToggleButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  searchToggleText: {
    fontSize: 18,
    color: colors.ink,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.ink,
  },
  advancedSearchButton: {
    backgroundColor: colors.moss,
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
  },
  advancedSearchText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  searchResults: {
    marginTop: 12,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchResultsTitle: {
    fontSize: 12,
    color: colors.inkSoft,
    fontWeight: "600",
    marginBottom: 8,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchResultImage: {
    width: 40,
    height: 55,
    borderRadius: 6,
  },
  searchResultInfo: {
    marginLeft: 10,
    flex: 1,
  },
  searchResultTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  noResultsText: {
    fontSize: 13,
    color: colors.inkSoft,
    fontStyle: "italic",
    paddingVertical: 6,
  },
});
