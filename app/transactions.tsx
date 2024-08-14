import { useState } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons'
import { formatRupiah } from '@/utils/format_price'

type Transaction = {
  id: string
  name: string
  amount: string
  date: string
}

// Group transactions by date
const groupByDate = (transactions: Transaction[]) => {
  const grouped: Record<string, Transaction[]> = {}

  transactions.forEach((transaction) => {
    if (!grouped[transaction.date]) {
      grouped[transaction.date] = []
    }
    grouped[transaction.date].push(transaction)
  })

  return grouped
}

// Sort grouped transactions by date
const sortDates = (groupedTransactions: Record<string, Transaction[]>) => {
  const dates = Object.keys(groupedTransactions)
  dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  const sortedGrouped: Record<string, Transaction[]> = {}
  dates.forEach((date) => {
    sortedGrouped[date] = groupedTransactions[date]
  })

  return sortedGrouped
}

export default function TransactionsScreen() {
  const { transactions } = useLocalSearchParams<{ transactions: string }>()
  const parsedTransactions: Transaction[] = transactions
    ? JSON.parse(transactions)
    : []

  const [searchQuery, setSearchQuery] = useState('')

  // Filter transactions based on search query
  const filteredTransactions = parsedTransactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group transactions by date
  const groupedTransactions = groupByDate(filteredTransactions)

  // Sort dates
  const sortedGroupedTransactions = sortDates(groupedTransactions)

  // Prepare data for rendering
  const renderData = Object.entries(sortedGroupedTransactions).map(
    ([date, transactions]) => ({
      date: new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      transactions,
    })
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0ea5e9" />

      <View style={styles.header}>
        <Ionicons
          onPress={() => router.back()}
          style={styles.icon}
          name="arrow-back"
          size={30}
          color="white"
        />
        <Text style={styles.title}>Daftar Transaksi</Text>
      </View>
      <View style={styles.section}>
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
              {item.transactions.map((transaction) => (
                <View key={transaction.id} style={styles.transaction}>
                  <Text style={styles.transaction_text}>
                    {transaction.name}
                  </Text>
                  <Text style={styles.transaction_text}>
                    {formatRupiah(transaction.amount)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 140,
    backgroundColor: '#0ea5e9',
  },
  icon: {
    marginLeft: 10,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'semibold',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 8,
  },
  section: {
    flex: -1,
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
    marginVertical: 16,
    borderRadius: 24,
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
    paddingVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: '#f4f4f5',
    borderRadius: 30,
    marginLeft: 15,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transaction_text: {
    color: 'black',
    fontSize: 16,
  },
})
