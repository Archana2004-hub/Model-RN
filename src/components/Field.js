import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, S } from '../theme';

export default function Field({ icon, label, error, secure, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <View style={{ marginTop: 14 }}>
      <Text style={S.label}>{label}</Text>
      <View style={[st.box, error && { borderColor: C.red }]}>
        <Ionicons name={icon} size={20} color={C.grey} />
        <TextInput style={st.in} placeholderTextColor={C.grey} secureTextEntry={secure && !show} autoCapitalize="none" {...props} />
        {secure && (
          <TouchableOpacity onPress={() => setShow(!show)}><Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={20} color={C.grey} /></TouchableOpacity>
        )}
      </View>
      {error ? <Text style={S.err}>{error}</Text> : null}
    </View>
  );
}
const st = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: C.border, borderRadius: 16, paddingHorizontal: 14, gap: 10 },
  in: { flex: 1, paddingVertical: 14, fontSize: 16, color: C.navy },
});
