import { StyleSheet } from 'react-native';
export const C = { primary: '#FF7A1A', navy: '#1B1F3B', cream: '#FFF8F0', grey: '#8A8DA3', border: '#EDE7DF', red: '#EF476F', teal: '#2EC4B6', white: '#fff' };
export const TINT = { Fruits: '#FFE3C8', Vegetables: '#DDF5E3', Dairy: '#E0ECFF', Bakery: '#FFF0C2' };
export const S = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.cream },
  label: { color: C.navy, fontWeight: '700', marginBottom: 6 },
  err: { color: C.red, marginTop: 4, fontSize: 12 },
  btn: { backgroundColor: C.primary, paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginTop: 22 },
  btnT: { color: '#fff', fontWeight: '800', fontSize: 16 },
  btnO: { borderWidth: 2, borderColor: C.primary, paddingVertical: 14, borderRadius: 30, alignItems: 'center', marginTop: 12 },
  btnOT: { color: C.primary, fontWeight: '800', fontSize: 16 },
  h1: { fontSize: 26, fontWeight: '800', color: C.navy },
  card: { backgroundColor: '#fff', borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
});
