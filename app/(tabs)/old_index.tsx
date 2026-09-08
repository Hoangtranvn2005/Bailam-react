import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyApp() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState({name: '', email: ''});

  const handleChange = (field: string, value: string) => {
    if (field === 'name') {
      setName(value);
    }
    if (field === 'email') {
      setEmail(value);
    }

    if (!value.trim()) {
      setError((prev) => ({
        ...prev, [field]: field === 'name' ? 'Tên không được để trống' : 'Email không được để trống'
      }));
    }
    else {
      setError((prev) => ({
        ...prev, [field]: ''
      }));
    }
  }

  return (
    <SafeAreaView style = {styles.container}>
      <Image
        source={require('../../assets/images/icon.png')}
        style = {styles.avatar}
      />
      <Text style = {styles.title}>Thông tin sinh viên</Text>
      <KeyboardAvoidingView>
        <View>
          <Text style = {styles.label}>Họ và Tên</Text>
          <TextInput style = {styles.input}
            value={name}
            onChangeText={(val) => handleChange('name', val)}
            autoCapitalize="sentences"
            placeholder="Họ và tên"
          />
          {error.name ? <Text style = {styles.errorText}>{error.name}</Text> : null}

          <Text style = {styles.label}>Mã số sinh viên</Text>
          <TextInput style = {styles.input}
            value={id}
            onChangeText={setId}
            keyboardType="numeric"
            placeholder="MSSV"
          />
          <Text style = {styles.label}>Email</Text>
          <TextInput style = {styles.input}
            value={email}
            onChangeText={(val) => handleChange('email', val)}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
          />
          {error.email ? <Text style = {styles.errorText}>{error.email}</Text> : null}

          <Text style = {styles.label}>Số điện thoại</Text>
          <TextInput style = {styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            placeholder="SĐT"
          />
          <Text style = {styles.label}>Mật khẩu</Text>
          <TextInput style = {styles.input}
            value={pass}
            onChangeText={setPass}
            secureTextEntry
            placeholder="Mật khẩu"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'blue',
  },
  label: {
    fontSize: 15,
    marginTop: 5,
  },
  avatar: {
    //marginTop: 100,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
  }
})