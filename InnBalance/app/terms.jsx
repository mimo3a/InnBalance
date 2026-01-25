import { Stack } from "expo-router";
import TermsScreen from "@/src/screens/TermsScreen";

export default function TermsRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <TermsScreen />
    </>
  );
}
