import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name or number"
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0F172A",
  },
});
