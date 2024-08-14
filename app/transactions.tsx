import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type Transaction = {
  id: string;
  name: string;
  amount: string;
  date: string;
};

// Group transactions by date
const groupByDate = (transactions: Transaction[]) => {
  const grouped: Record<string, Transaction[]> = {};

  transactions.forEach(transaction => {
    if (!grouped[transaction.date]) {
      grouped[transaction.date] = [];
    }
    grouped[transaction.date].push(transaction);
  });

  return grouped;
};

// Sort grouped transactions by date
const sortDates = (groupedTransactions: Record<string, Transaction[]>) => {
  const dates = Object.keys(groupedTransactions);
  dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const sortedGrouped: Record<string, Transaction[]> = {};
  dates.forEach(date => {
    sortedGrouped[date] = groupedTransactions[date];
  });

  return sortedGrouped;
};

export default function TransactionsScreen() {
  const { transactions } = useLocalSearchParams<{ transactions: string }>();
  const parsedTransactions: Transaction[] = transactions ? JSON.parse(transactions) : [];

  const [searchQuery, setSearchQuery] = useState('');

  // Filter transactions based on search query
  const filteredTransactions = parsedTransactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group transactions by date
  const groupedTransactions = groupByDate(filteredTransactions);

  // Sort dates
  const sortedGroupedTransactions = sortDates(groupedTransactions);

  // Prepare data for rendering
  const renderData = Object.entries(sortedGroupedTransactions).map(([date, transactions]) => ({
    date: new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    transactions
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Transaksi</Text>

      <TextInput
        style={styles.input}
        placeholder="Cari nama..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={renderData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.dateSection}>
            <Text style={styles.date}>{item.date}</Text>
            {item.transactions.map(transaction => (
              <View key={transaction.id} style={styles.transaction}>
                <Text>{transaction.name} - {transaction.amount}</Text>
              </View>
            ))}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  dateSection: {
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transaction: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

