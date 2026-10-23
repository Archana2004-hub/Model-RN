import React, { useState } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import ProductList from '../components/ProductList';
import { CATEGORIES } from '../data/products';
import { C, TINT } from '../theme';

export default function ProductsScreen({ navigation }) {
  const { products, user } = useApp();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const data = products.filter((p) => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  const header = (
    <View>
      <View style={{ backgroundColor: C.navy, paddingHorizontal: 20, paddingBottom: 26, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
        <Text style={{ color: C.grey }}>Hello, {user.name.split(' ')[0]} 👋</Text>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800', marginTop: 2 }}>What would you like{'\n'}to buy today?</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 14, marginTop: 16, gap: 8 }}>
          <Ionicons name="search" size={20} color={C.grey} />
          <TextInput style={{ flex: 1, paddingVertical: 13, fontSize: 16 }} placeholder="Search groceries" placeholderTextColor={C.grey} value={q} onChangeText={setQ} />
          {q ? <TouchableOpacity onPress={() => setQ('')}><Ionicons name="close-circle" size={20} color={C.grey} /></TouchableOpacity> : null}
        </View>
      </View>
      <View style={{ backgroundColor: C.primary, borderRadius: 24, marginHorizontal: 18, marginTop: 18, padding: 18, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 18 }}>Free delivery</Text>
          <Text style={{ color: '#FFE9D6', marginTop: 4 }}>On orders above ₹500</Text>
        </View>
        <Image source={require('../../assets/products/orange.png')} style={{ width: 80, height: 80 }} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 18 }}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity key={c} onPress={() => setCat(c)} style={{ paddingHorizontal: 18, paddingVertical: 9, borderRadius: 20, marginRight: 10, backgroundColor: cat === c ? C.navy : TINT[c] || '#fff', borderWidth: 1, borderColor: C.border }}>
            <Text style={{ color: cat === c ? '#fff' : C.navy, fontWeight: '700' }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
  return <ProductList data={data} navigation={navigation} header={header} empty="No products found" />;
}
