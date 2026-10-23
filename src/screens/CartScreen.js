import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { S, C, TINT } from '../theme';

export default function CartScreen() {
  const { products, cart, changeQty, removeFromCart, clearCart, cartCount } = useApp();
  const items = products.filter((p) => cart[p.id]);
  const sub = items.reduce((s, p) => s + p.price * cart[p.id], 0);
  const delivery = items.length ? (sub >= 500 ? 0 : 40) : 0;
  const total = sub + delivery;
  const checkout = () => Alert.alert('Order placed 🎉', `Total paid: ₹${total.toFixed(0)}`, [{ text: 'OK', onPress: clearCart }]);
  const row = (l, v, bold) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
      <Text style={{ color: bold ? C.navy : C.grey, fontWeight: bold ? '800' : '500', fontSize: bold ? 18 : 15 }}>{l}</Text>
      <Text style={{ color: C.navy, fontWeight: '800', fontSize: bold ? 18 : 15 }}>{v}</Text>
    </View>
  );

  return (
    <View style={S.screen}>
      <FlatList
        data={items} keyExtractor={(i) => String(i.id)} contentContainerStyle={{ paddingBottom: 130 }}
        ListHeaderComponent={
          <View style={{ backgroundColor: C.navy, padding: 20, paddingBottom: 26, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, marginBottom: 6 }}>
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800' }}>My Cart 🛒</Text>
            <Text style={{ color: C.grey, marginTop: 2 }}>{cartCount} item(s)</Text>
          </View>
        }
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 60, color: C.grey }}>Your cart is empty</Text>}
        renderItem={({ item }) => (
          <View style={[S.card, { flexDirection: 'row', alignItems: 'center', marginHorizontal: 18, marginTop: 14, padding: 12 }]}>
            <View style={{ width: 76, height: 76, borderRadius: 18, backgroundColor: TINT[item.category], alignItems: 'center', justifyContent: 'center' }}>
              <Image source={item.image} style={{ width: 58, height: 58 }} resizeMode="contain" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontWeight: '800', fontSize: 16, color: C.navy }}>{item.name}</Text>
              <Text style={{ color: C.grey }}>{item.unit} · ₹{item.price.toFixed(0)}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <TouchableOpacity onPress={() => changeQty(item.id, -1)} style={{ backgroundColor: C.cream, borderRadius: 14, padding: 5, borderWidth: 1, borderColor: C.border }}><Ionicons name="remove" size={18} color={C.navy} /></TouchableOpacity>
                <Text style={{ marginHorizontal: 14, fontWeight: '800', fontSize: 16 }}>{cart[item.id]}</Text>
                <TouchableOpacity onPress={() => changeQty(item.id, 1)} style={{ backgroundColor: C.primary, borderRadius: 14, padding: 5 }}><Ionicons name="add" size={18} color="#fff" /></TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', height: 76, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}><Ionicons name="trash-outline" size={20} color={C.red} /></TouchableOpacity>
              <Text style={{ fontWeight: '800', fontSize: 16, color: C.navy }}>₹{(item.price * cart[item.id]).toFixed(0)}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={items.length > 0 && (
          <View style={[S.card, { margin: 18, padding: 18 }]}>
            {row('Subtotal', `₹${sub.toFixed(0)}`)}
            {row('Delivery', delivery ? `₹${delivery.toFixed(0)}` : 'Free')}
            <View style={{ height: 1, backgroundColor: C.border, marginTop: 12 }} />
            {row('Total', `₹${total.toFixed(0)}`, true)}
            <TouchableOpacity style={S.btn} onPress={checkout}><Text style={S.btnT}>Checkout</Text></TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
