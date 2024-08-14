import { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';

type Transaction = {
  id: string;
  name: string;
  amount: string;
  date: string;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const addTransaction = () => {
    if (name && amount) {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        name,
        amount,
        date: new Date().toISOString().split('T')[0]
      };
      setTransactions([...transactions, newTransaction]);
      setName('');
      setAmount('');
    }
  };

  const navigateToTransactions = () => {
    router.push({
      pathname: '/transactions',
      params: { transactions: JSON.stringify(transactions) }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor='#0ea5e9' />
      <View style={styles.header}>
        <Text style={styles.title}>Pembayaran Kas</Text>
      </View>
      <View style={styles.form}>
        <Text style={{ paddingTop: 10, paddingBottom: 20, paddingLeft: 20, fontSize: 20, fontWeight: 'semibold' }}>Transaksi</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Anggota"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Jumlah Pembayaran"
          value={amount}
          keyboardType="numeric"
          onChangeText={setAmount}
        />
        <Pressable style={styles.button} onPress={addTransaction} >
          <Text style={styles.button_text}>Tambah Transaksi</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={navigateToTransactions}  >
          <Text style={styles.button_text}>Lihat Transaksi</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    width: '100%',
    height: 130,
    backgroundColor: '#0ea5e9',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  form: {
    padding: 10,
    marginTop: -30,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderRadius: 24,
  },
  button: {
    marginVertical: 8,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#0ea5e9",
  },
  button_text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white'
  }
});

