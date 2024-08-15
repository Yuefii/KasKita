import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_APP_ID || '',
}

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig)

// Inisialisasi Firestore
const firestore = getFirestore(app)

export { firestore, collection, addDoc }

export const fetchTransactions = async () => {
  try {
    const transactionsCollection = collection(firestore, 'transactions')
    const transactionSnapshot = await getDocs(transactionsCollection)
    const transactionList = transactionSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return transactionList
  } catch (error) {
    console.error('Error fetching transactions: ', error)
    return []
  }
}
