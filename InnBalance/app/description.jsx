import PlaceDescriptionScreen from "@/src/screens/PlaceDesriptionScreen";
import { Stack } from "expo-router";

export default function DescriptionRoute() {
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <PlaceDescriptionScreen />
    </>
  )
}