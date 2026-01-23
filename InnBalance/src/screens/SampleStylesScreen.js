import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useCommonStyles } from "@/src/styles/common";
import { useTokens } from "@/src/styles/tokens";

export default function SampleStylesScreen() {
  // Test: force theme toggle locally (without touching app-wide theme)
  const [forcedMode, setForcedMode] = useState(null); // null = system, "light" or "dark" = forced

  const common = useCommonStyles(forcedMode);
  const tokens = useTokens(forcedMode);

  return (
    <View style={[common.screen, common.container]}>
      <Text style={common.title}>Sample Styles Screen</Text>
      <Text style={common.small}>
        Current mode: {tokens.mode} {forcedMode ? "(forced)" : "(system)"}
      </Text>

      <View style={common.divider} />

      <View style={[common.card, common.shadowCard]}>
        <Text style={common.header}>Card</Text>
        <Text style={common.body}>
          This card uses common.card + common.shadowCard.
        </Text>

        <TextInput
          placeholder="Type something..."
          placeholderTextColor={tokens.colors.textMuted}
          style={[common.input, { marginTop: tokens.spacing.sm }]}
        />

        <View style={{ marginTop: tokens.spacing.md }}>
          <Pressable style={common.button} onPress={() => {}}>
            <Text style={common.buttonText}>Primary Button</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: tokens.spacing.sm }}>
          <Pressable style={common.buttonAccent} onPress={() => {}}>
            <Text style={common.buttonAccentText}>Accent Button</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: tokens.spacing.md }}>
        <Pressable
          style={common.button}
          onPress={() => setForcedMode(null)}
        >
          <Text style={common.buttonText}>Use System Theme</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: tokens.spacing.sm }}>
        <Pressable
          style={common.button}
          onPress={() => setForcedMode("light")}
        >
          <Text style={common.buttonText}>Force Light</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: tokens.spacing.sm }}>
        <Pressable
          style={common.button}
          onPress={() => setForcedMode("dark")}
        >
          <Text style={common.buttonText}>Force Dark</Text>
        </Pressable>
      </View>
    </View>
  );
}