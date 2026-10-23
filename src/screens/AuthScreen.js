import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import Field from '../components/Field';
import { S, C } from '../theme';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthScreen({ route, navigation }) {
  const { signIn, signUp } = useApp();
  const { mode, role } = route.params;
  const up = mode === 'signup';
  const [f, setF] = useState({ name: '', email: '', password: '', confirm: '' });
  const [e, setE] = useState({});
  const set = (k) => (v) => setF({ ...f, [k]: v });

  const submit = () => {
    const er = {};
    if (up && f.name.trim().length < 2) er.name = 'Enter your name (min 2 characters)';
    if (!EMAIL.test(f.email.trim())) er.email = 'Enter a valid email address';
    if (f.password.length < 6) er.password = 'Password must be at least 6 characters';
    if (up && f.confirm !== f.password) er.confirm = 'Passwords do not match';
    if (Object.keys(er).length) return setE(er);
    const msg = up
      ? signUp({ name: f.name.trim(), email: f.email.trim(), password: f.password, role })
      : signIn(f.email.trim(), f.password, role);
    if (msg) setE({ form: msg });
  };

  return (
    <ScrollView style={{ backgroundColor: C.navy }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={{ alignItems: 'center', paddingTop: 70, paddingBottom: 26 }}>
        <Image source={require('../../assets/products/logo.png')} style={{ width: 84, height: 84 }} />
        <Text style={{ color: '#fff', fontSize: 26, fontWeight: '800', marginTop: 8 }}>{up ? 'Create Account' : 'Welcome Back'}</Text>
        <View style={{ backgroundColor: C.primary, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 4, marginTop: 8 }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 12 }}>{role === 'admin' ? 'ADMIN' : 'CUSTOMER'}</Text>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: C.cream, borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 24, paddingBottom: 40 }}>
        {!up && <Text style={{ color: C.grey, fontSize: 12 }}>Demo: {role === 'admin' ? 'admin@shop.com / admin123' : 'user@shop.com / user123'}</Text>}
        {up && <Field icon="person-outline" label="Full Name" value={f.name} onChangeText={set('name')} error={e.name} autoCapitalize="words" placeholder="John Doe" />}
        <Field icon="mail-outline" label="Email" value={f.email} onChangeText={set('email')} error={e.email} keyboardType="email-address" placeholder="you@example.com" />
        <Field icon="lock-closed-outline" label="Password" secure value={f.password} onChangeText={set('password')} error={e.password} placeholder="Min 6 characters" />
        {up && <Field icon="shield-checkmark-outline" label="Confirm Password" secure value={f.confirm} onChangeText={set('confirm')} error={e.confirm} placeholder="Re-enter password" />}
        {e.form && <Text style={[S.err, { textAlign: 'center', marginTop: 12 }]}>{e.form}</Text>}
        <TouchableOpacity style={S.btn} onPress={submit}><Text style={S.btnT}>{up ? 'Sign Up' : 'Sign In'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Auth', { mode: up ? 'signin' : 'signup', role })} style={{ marginTop: 20 }}>
          <Text style={{ textAlign: 'center', color: C.grey }}>{up ? 'Already a member? ' : 'New here? '}<Text style={{ color: C.primary, fontWeight: '800' }}>{up ? 'Sign In' : 'Create account'}</Text></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
