import React from 'react';
import { View, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import ProductList from '../components/ProductList';
import { C } from '../theme';

export default function FavoritesScreen({ navigation }) {
  const { products, favs } = useApp();
  const header = (
    <View style={{ backgroundColor: C.navy, padding: 20, paddingBottom: 26, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800' }}>My Favorites ❤️</Text>
      <Text style={{ color: C.grey, marginTop: 2 }}>{favs.length} saved item(s)</Text>
    </View>
  );
  return <ProductList data={products.filter((p) => favs.includes(p.id))} navigation={navigation} header={header} empty="No favorites yet. Tap the heart on a product." />;
}
