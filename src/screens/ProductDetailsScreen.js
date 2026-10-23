import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { S, C, TINT } from '../theme';

export default function ProductDetailsScreen({ route, navigation }) {
  const { products, favs, toggleFav, addToCart } = useApp();
  const p = products.find((x) => x.id === route.params.id);
  const [qty, setQty] = useState(1);
  if (!p) return <View style={S.screen}><Text>Product not found</Text></View>;
  return (
    <View style={S.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={{ backgroundColor: TINT[p.category], height: 360, borderBottomLeftRadius: 44, borderBottomRightRadius: 44, alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
          <Image source={p.image} style={{ width: 240, height: 240 }} resizeMode="contain" />
          <TouchableOpacity onPress={() => toggleFav(p.id)} style={{ position: 'absolute', top: 100, right: 22, backgroundColor: '#fff', padding: 10, borderRadius: 20 }}>
            <Ionicons name={favs.includes(p.id) ? 'heart' : 'heart-outline'} size={24} color={C.red} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 22 }}>
          <Text style={{ color: C.primary, fontWeight: '800', letterSpacing: 1 }}>{p.category.toUpperCase()}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Text style={[S.h1, { flex: 1 }]}>{p.name}</Text>
            <Text style={{ fontSize: 24, fontWeight: '800', color: C.navy }}>₹{p.price.toFixed(0)}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 }}>
            <Ionicons name="star" size={16} color="#FFB703" /><Text style={{ fontWeight: '700' }}>4.8</Text>
            <Text style={{ color: C.grey }}>· {p.unit} · Fresh stock</Text>
          </View>
          <Text style={{ fontWeight: '800', fontSize: 16, color: C.navy, marginTop: 22 }}>About this product</Text>
          <Text style={{ color: C.grey, marginTop: 6, lineHeight: 22 }}>{p.desc}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
            <Text style={{ fontWeight: '800', fontSize: 16, color: C.navy }}>Quantity</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 24, padding: 4, borderWidth: 1, borderColor: C.border }}>
              <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={{ backgroundColor: C.cream, borderRadius: 20, padding: 8 }}><Ionicons name="remove" size={20} color={C.navy} /></TouchableOpacity>
              <Text style={{ fontWeight: '800', fontSize: 18, marginHorizontal: 18 }}>{qty}</Text>
              <TouchableOpacity onPress={() => setQty(qty + 1)} style={{ backgroundColor: C.primary, borderRadius: 20, padding: 8 }}><Ionicons name="add" size={20} color="#fff" /></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 18, borderTopLeftRadius: 28, borderTopRightRadius: 28, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <View><Text style={{ color: C.grey }}>Total</Text><Text style={{ fontSize: 22, fontWeight: '800', color: C.navy }}>₹{(p.price * qty).toFixed(0)}</Text></View>
        <TouchableOpacity style={{ flex: 1, backgroundColor: C.primary, paddingVertical: 16, borderRadius: 26, alignItems: 'center' }} onPress={() => { addToCart(Array(qty).fill(p.id)); navigation.goBack(); }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
