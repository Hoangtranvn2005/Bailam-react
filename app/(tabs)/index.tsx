import { View, Text, StyleSheet, Image, ScrollView, SectionList, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyApp() {
    const FEATURED_BOOKS = [
      { id: "1", title: "Đắc Nhân Tâm", author: "Dale Carnegie", price: "86.000đ", image: "https://picsum.photos/200/300?random=1" },
      { id: "2", title: "Nhà Giả Kim", author: "Paulo Coelho", price: "79.000đ", image: "https://picsum.photos/200/300?random=2" },
      { id: "3", title: "Tư Duy Nhanh Và Chậm", author: "Daniel Kahneman", price: "150.000đ", image: "https://picsum.photos/200/300?random=3" },
      { id: "4", title: "Đọc Bất Kỳ Ai", author: "David J. Lieberman", price: "95.000đ", image: "https://picsum.photos/200/300?random=5" },
      { id: "5", title: "Thép Đã Tôi Thế Đấy", author: "Nikolai Ostrovsky", price: "110.000đ", image: "https://picsum.photos/200/300?random=6" },
      { id: "6", title: "Re:Zero Vol 1", author: "Tappei Nagatsuki", price: "105.000đ", image: "https://picsum.photos/200/300?random=7" },
      { id: "7", title: "Tôi Không Có Miệng Và Tôi Phải Hét", author: "Harlan Ellison", price: "85.000đ", image: "https://picsum.photos/200/300?random=8" },
    ];


    return (
        <SafeAreaView>
          <View style = {styles.header}>
            <Image
              source={require('../../assets/images/icon.png')}
              style = {styles.avatar}
            />
            <View><Text style = {styles.titles}>TRANG WEB BÁN SÁCH</Text></View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style = {styles.bannerContainer}>
              <Text style = {styles.titles}>Sách nổi bật</Text>
              <Pressable style = {styles.iconButton} onPress={() => alert('Mở thông báo!')}>
                <Text style ={{fontSize: 20}}>🔔</Text>
              </Pressable>
            </View>
            <View>
              <Text style = {styles.containerTitle}>Nơi bán sách uy tín hàng đầu Việt Nam. Cam kết chất lượng. Giá cả cạnh tranh!</Text>
            </View>
            <View style = {styles.sectionContainer}>
              <SectionList
                scrollEnabled={false}
                sections={[
                  { data: FEATURED_BOOKS },
                ]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style = {styles.listItem}>
                    <Image source={{ uri: item.image }} style = {styles.listItemImage} />
                    <View style = {styles.listItemInfo}>
                      <Text style = {styles.bookTitle}>{item.title}</Text>
                      <Text style = {styles.bookAuthor}>{item.author}</Text>
                      <Text style = {styles.bookPrice}>{item.price}</Text>
                    </View>
                    <Pressable style = {styles.button} onPress={() => alert('Hiện chưa có!')}>
                      <Text style = {{color: '#FFFFFF'}}>Thông tin chi tiết</Text>
                    </Pressable>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 15,
    borderRadius: 10,
  },
  titles: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'blue',
  },
  bookAuthor: {
    fontSize: 12,
    color: "#777",
    marginVertical: 2,
  },
  avatar: {
    //marginTop: 100,
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  iconButton: {
    width: 30,
    height: 30,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  listItemImage: {
    width: 60,
    height: 80,
    borderRadius: 4,
  },
  listItemInfo: {
    flex: 1,
    marginLeft: 14,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  bookPrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#E53935",
    marginBottom: 6,
  },
  button: {
    backgroundColor: "#1E88E5",
    padding: 6,
    borderRadius: 4,
  },
})