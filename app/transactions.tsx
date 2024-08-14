// app/transactions.tsx
import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type Transaction = {
  id: string;
  name: string;
  amount: string;
};

export default function TransactionsScreen() {
  const { transactions } = useLocalSearchParams<{ transactions: string }>();
  const parsedTransactions: Transaction[] = transactions ? JSON.parse(transactions) : [];
  
  // State for sorting and filtering
  const [sortType, setSortType] = useState<'name' | 'amount'>('name');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort transactions based on the selected sort type
  const sortedTransactions = [...parsedTransactions].sort((a, b) => {
    if (sortType === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      const amountA = parseFloat(a.amount);
      const amountB = parseFloat(b.amount);
      return amountA - amountB;
    }
  });

  // Filter transactions based on the search query
  const filteredTransactions = sortedTransactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Transaksi</Text>

      <View style={styles.sortContainer}>
        <Button title="Sort by Name" onPress={() => setSortType('name')} />
        <Button title="Sort by Amount" onPress={() => setSortType('amount')} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Cari nama..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text>{item.name}: {item.amount}</Text>
          </View>
        )}
      />
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
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  transaction: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

