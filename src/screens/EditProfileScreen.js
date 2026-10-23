import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import Field from '../components/Field';
import { S, C } from '../theme';

export default function EditProfileScreen({ navigation }) {
  const { user, updateProfile } = useApp();
  const [f, setF] = useState({ name: user.name, phone: user.phone, address: user.address });
  const [e, setE] = useState({});
  const set = (k) => (v) => setF({ ...f, [k]: v });
  const save = () => {
    const er = {};
    if (f.name.trim().length < 2) er.name = 'Name must be at least 2 characters';
    if (!/^\d{10}$/.test(f.phone)) er.phone = 'Phone must be exactly 10 digits';
    if (f.address.trim().length < 5) er.address = 'Enter a valid address (min 5 characters)';
    setE(er);
    if (Object.keys(er).length) return;
    updateProfile({ name: f.name.trim(), phone: f.phone, address: f.address.trim() });
    Alert.alert('Saved ✅', 'Profile updated', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };
  return (
    <ScrollView style={S.screen} contentContainerStyle={{ padding: 22 }} keyboardShouldPersistTaps="handled">
      <Field icon="person-outline" label="Full Name" value={f.name} onChangeText={set('name')} error={e.name} autoCapitalize="words" />
      <Field icon="mail-outline" label="Email (cannot be changed)" value={user.email} editable={false} style={{ opacity: 0.5, flex: 1, paddingVertical: 14, fontSize: 16 }} />
      <Field icon="call-outline" label="Phone" value={f.phone} onChangeText={set('phone')} error={e.phone} keyboardType="number-pad" maxLength={10} />
      <Field icon="location-outline" label="Address" value={f.address} onChangeText={set('address')} error={e.address} multiline autoCapitalize="sentences" />
      <TouchableOpacity style={S.btn} onPress={save}><Text style={S.btnT}>Save Changes</Text></TouchableOpacity>
    </ScrollView>
  );
}
