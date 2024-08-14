import { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Transaction = {
  id: string;
  name: string;
  amount: string;
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
        amount
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
    <View style={styles.container}>
      <Text style={styles.title}>Catat Pembayaran Kas</Text>
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
      <Button title="Tambah Transaksi" onPress={addTransaction} />
      <Button title="Lihat Transaksi" onPress={navigateToTransactions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});
