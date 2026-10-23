import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { S, C } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useApp();
  const row = (icon, l, v) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: C.border }}>
      <View style={{ backgroundColor: C.cream, padding: 10, borderRadius: 14 }}><Ionicons name={icon} size={20} color={C.primary} /></View>
      <View style={{ marginLeft: 14, flex: 1 }}>
        <Text style={{ color: C.grey, fontSize: 12 }}>{l}</Text>
        <Text style={{ fontSize: 16, fontWeight: '700', color: C.navy, marginTop: 2 }}>{v || 'Not added'}</Text>
      </View>
    </View>
  );
  return (
    <ScrollView style={S.screen} contentContainerStyle={{ paddingBottom: 130 }}>
      <View style={{ backgroundColor: C.navy, alignItems: 'center', paddingTop: 30, paddingBottom: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}>
        <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#fff' }}>
          <Text style={{ fontSize: 40, color: '#fff', fontWeight: '800' }}>{user.name[0].toUpperCase()}</Text>
        </View>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 12 }}>{user.name}</Text>
        <Text style={{ color: C.grey }}>{user.email}</Text>
      </View>
      <View style={[S.card, { marginHorizontal: 18, marginTop: -26, paddingHorizontal: 16 }]}>
        {row('mail-outline', 'Email', user.email)}
        {row('call-outline', 'Phone', user.phone)}
        {row('location-outline', 'Address', user.address)}
      </View>
      <View style={{ paddingHorizontal: 18 }}>
        <TouchableOpacity style={S.btn} onPress={() => navigation.navigate('EditProfile')}><Text style={S.btnT}>Edit Profile</Text></TouchableOpacity>
        <TouchableOpacity style={S.btnO} onPress={signOut}><Text style={S.btnOT}>Log Out</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}
