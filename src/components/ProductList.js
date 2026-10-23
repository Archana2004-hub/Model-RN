import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { C, TINT } from '../theme';

// Shared list for Products & Favorites (single + multi add to cart)
export default function ProductList({ data, navigation, empty = 'Nothing here yet', header }) {
  const { user, favs, toggleFav, addToCart, removeProduct } = useApp();
  const isCustomer = user.role === 'customer';
  const [sel, setSel] = useState([]);
  const toggleSel = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const renderItem = ({ item }) => {
    const on = sel.includes(item.id);
    return (
      <TouchableOpacity activeOpacity={0.9} style={[st.card, on && { borderColor: C.primary }]}
        onPress={() => isCustomer && navigation.navigate('ProductDetails', { id: item.id })}>
        <View style={[st.imgBox, { backgroundColor: TINT[item.category] }]}>
          <Image source={item.image} style={st.img} resizeMode="contain" />
          {isCustomer && (
            <TouchableOpacity style={st.chk} onPress={() => toggleSel(item.id)}>
              <Ionicons name={on ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={on ? C.primary : C.grey} />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={st.cat}>{item.category.toUpperCase()}</Text>
          <Text style={st.name} numberOfLines={1}>{item.name}</Text>
          <Text style={st.unit}>{item.unit}</Text>
          <Text style={st.price}>₹{item.price.toFixed(0)}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          {isCustomer ? (
            <TouchableOpacity onPress={() => toggleFav(item.id)}>
              <Ionicons name={favs.includes(item.id) ? 'heart' : 'heart-outline'} size={24} color={C.red} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => removeProduct(item.id)}><Ionicons name="trash-outline" size={22} color={C.red} /></TouchableOpacity>
          )}
          <TouchableOpacity style={st.add} onPress={() => addToCart(item.id)}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.cream }}>
      <FlatList
        data={data} keyExtractor={(i) => String(i.id)} renderItem={renderItem}
        ListHeaderComponent={header} contentContainerStyle={{ paddingBottom: 130 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: C.grey }}>{empty}</Text>}
      />
      {sel.length > 0 && (
        <View style={st.bar}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>{sel.length} selected</Text>
          <TouchableOpacity style={st.barBtn} onPress={() => { addToCart(sel); setSel([]); }}>
            <Text style={{ color: '#fff', fontWeight: '800' }}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const st = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 18, marginTop: 14, padding: 12, borderRadius: 22, borderWidth: 2, borderColor: 'transparent', shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  imgBox: { width: 92, height: 92, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  img: { width: 70, height: 70 },
  chk: { position: 'absolute', top: 4, left: 4 },
  cat: { color: C.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  name: { fontWeight: '800', fontSize: 17, color: C.navy, marginTop: 2 },
  unit: { color: C.grey, marginTop: 2 },
  price: { fontWeight: '800', fontSize: 18, color: C.navy, marginTop: 6 },
  add: { backgroundColor: C.primary, borderRadius: 14, padding: 8, marginTop: 14 },
  bar: { position: 'absolute', bottom: 96, left: 18, right: 18, backgroundColor: C.navy, borderRadius: 24, paddingVertical: 12, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  barBtn: { backgroundColor: C.primary, paddingVertical: 10, paddingHorizontal: 18, borderRadius: 18 },
});
