import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from './types';
import LoginScreen from './scr/pages/Login/LoginScreen';
import RegisterScreen from './scr/pages/Register/RegisterScreen';
import HomeScreen from './scr/pages/Home/HomeScreen';


// initialize the database
const initializeDatabase = async(db: any) => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE,
          nome TEXT,
          password TEXT
      );
    `);
    console.log('Database initialized!');
  } catch (error) {
    console.error('Error while initializing the database:', error);
  }
};

// create a stack navigation that manages the navigation between screens
const Stack = createStackNavigator<RootStackParamList>();

// we'll have 3 screens : Login, Register and Home


export default function App() {
  return (
    <SQLiteProvider databaseName='auth.db' onInit={initializeDatabase}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Register' component={RegisterScreen}/>
          <Stack.Screen name='Home' component={HomeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>  
    </SQLiteProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
