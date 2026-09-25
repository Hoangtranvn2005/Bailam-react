import { Stack } from "expo-router";

export default function StudentLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Các thể loại sách" }} />
      <Stack.Screen
        name="category"
        options={{ title: "Thoát" }}
      />
    </Stack>
  );
}
