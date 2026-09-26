// src/styles/appStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  screenContainer: { flex: 1, padding: 16 },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#D32F2F",
    marginBottom: 16,
  },
  textInput: {
    height: 48,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    borderColor: "#E2E8F0",
    borderWidth: 1,
    marginBottom: 16,
    fontSize: 16,
  },
  scrollList: { flexDirection: "column", gap: 12, paddingBottom: 20 },

  // Updated Card Styles to fit the Image
  card: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#D32F2F",
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: { width: 70, height: 70, resizeMode: "contain", marginRight: 16 },
  cardContent: { flex: 1 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pokemonName: { fontSize: 18, fontWeight: "bold", color: "#1A202C" },
  pokemonType: { fontSize: 14, color: "#718096", marginTop: 6 },

  emptyText: {
    textAlign: "center",
    color: "#718096",
    marginTop: 20,
    fontSize: 16,
  },
  badgeContainer: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 12, fontWeight: "700" },
  navigationRow: { flexDirection: "row", marginBottom: 20 },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },

  // Updated Detail Styles for the Image
  detailCard: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 16,
    elevation: 3,
  },
  detailImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 16,
  },
  detailName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1A202C",
    marginBottom: 12,
    textAlign: "center",
  },
  badgeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
    justifyContent: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 8,
  },
  descriptionText: { fontSize: 16, lineHeight: 24, color: "#4A5568" },
});
