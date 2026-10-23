import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { C, TINT } from '../theme';

const W = Dimensions.get('window').width;
const img = {
  apple: require('../../assets/products/apple.png'), broccoli: require('../../assets/products/broccoli.png'),
  croissant: require('../../assets/products/croissant.png'), banana: require('../../assets/products/banana.png'),
  milk: require('../../assets/products/milk.png'), logo: require('../../assets/products/logo.png'),
};
const Bubble = ({ src, size, style, tint }) => (
  <View style={[{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: tint, alignItems: 'center', justifyContent: 'center' }, style]}>
    <Image source={src} style={{ width: size * 0.68, height: size * 0.68 }} resizeMode="contain" />
  </View>
);

export default function HomeScreen({ navigation }) {
  const [role, setRole] = useState('customer');
  const go = (mode) => () => navigation.navigate('Auth', { mode, role });
  return (
    <View style={{ flex: 1, backgroundColor: C.navy }}>
      <View style={{ height: 350 }}>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 56, marginLeft: 24 }}>
          Fresh<Text style={{ color: C.primary }}>Cart</Text>
        </Text>
        <Bubble src={img.apple} size={190} tint={TINT.Fruits} style={{ left: W / 2 - 95, top: 100 }} />
        <Bubble src={img.broccoli} size={100} tint={TINT.Vegetables} style={{ left: 22, top: 80 }} />
        <Bubble src={img.banana} size={84} tint={TINT.Bakery} style={{ left: W - 110, top: 60 }} />
        <Bubble src={img.milk} size={92} tint={TINT.Dairy} style={{ left: 30, top: 240 }} />
        <Bubble src={img.croissant} size={110} tint={TINT.Bakery} style={{ left: W - 135, top: 225 }} />
      </View>
      <View style={{ flex: 1, backgroundColor: C.cream, borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: C.navy }}>Fresh groceries,{'\n'}delivered fast.</Text>
        <Text style={{ color: C.grey, marginTop: 6 }}>Fruits, veggies, dairy & bakery at your doorstep.</Text>
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 30, padding: 4, marginTop: 20, borderWidth: 1, borderColor: C.border }}>
          {['customer', 'admin'].map((r) => (
            <TouchableOpacity key={r} onPress={() => setRole(r)} style={{ flex: 1, paddingVertical: 11, borderRadius: 26, alignItems: 'center', backgroundColor: role === r ? C.navy : 'transparent' }}>
              <Text style={{ fontWeight: '800', color: role === r ? '#fff' : C.grey }}>{r === 'customer' ? 'Customer' : 'Admin'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={{ backgroundColor: C.primary, paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginTop: 18 }} onPress={go('signin')}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>Sign In as {role === 'admin' ? 'Admin' : 'Customer'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderWidth: 2, borderColor: C.navy, paddingVertical: 14, borderRadius: 30, alignItems: 'center', marginTop: 12 }} onPress={go('signup')}>
          <Text style={{ color: C.navy, fontWeight: '800', fontSize: 16 }}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
