import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from './scr/global/themes';

import { UserProvider } from './scr/contexts/UserContext';

import { RootStackParamList } from './types';
import LoginScreen from './scr/pages/Login/LoginScreen';
import RegisterScreen from './scr/pages/Register/RegisterScreen';
import HomeScreen from './scr/pages/Home/HomeScreen';
import ProfileScreen from './scr/pages/Profile/ProfileScreen';
import HistoryScreen from './scr/pages/History/HistoryScreen';
import FAQScreen from './scr/pages/FAQ/FAQScreen';
import NotificationsScreen from './scr/pages/Notifications/NotificationsScreen';
import CampaignsScreen from './scr/pages/Campaigns/CampaignsScreen';
import DetailsScreen from './scr/pages/Details/DetailsScreen';
import AddDonationScreen from './scr/pages/AddDonation/AddDonationScreen';

/* // initialize the database
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
 */

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'History') {
          iconName = 'history';
        } else if (route.name === 'Notifications') {
          iconName = 'notifications';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }

        return (
          <MaterialIcons
            name={iconName!}
            size={30}
            color={focused ? themes.colors.black : themes.colors.darkGrey}
          />
        );
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarActiveTintColor: themes.colors.black,
      tabBarInactiveTintColor: themes.colors.darkGrey,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="History" component={HistoryScreen}
    options={{ headerShown: true, 
      headerStyle: {
        backgroundColor: themes.colors.darkRed,
      },
      headerTintColor: themes.colors.white,
      headerTitle: 'As minhas doações',
    }}/>
    <Tab.Screen name="Notifications" component={NotificationsScreen}
    options={{ headerShown: true, 
      headerStyle: {
        backgroundColor: themes.colors.darkRed,
      },
      headerTintColor: themes.colors.white,
      headerTitle: 'Notificações',
    }}/>
    <Tab.Screen name="Profile" component={ProfileScreen} 
    options={{ headerShown: true, 
      headerStyle: {
        backgroundColor: themes.colors.darkRed,
      },
      headerTintColor: themes.colors.white,
      headerTitle: 'Perfil',
    }}/>
  </Tab.Navigator>
);


export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name='Home' component={HomeTabs} options={{ headerShown: false, headerLeft: () => null}}/>

          <Stack.Screen name='Details' component={DetailsScreen}
          options={{ headerShown: true, 
            headerStyle: {
              backgroundColor: themes.colors.darkRed,
            },
            headerTintColor: themes.colors.white,
            headerTitle: 'Detalhes da Instituição',
          }}/>

          <Stack.Screen name='AddDonation' component={AddDonationScreen}
          options={{ headerShown: true, 
            headerStyle: {
              backgroundColor: themes.colors.darkRed,
            },
            headerTintColor: themes.colors.white,
            headerTitle: 'Adicionar doação',
          }}/>

          <Stack.Screen name='FAQ' component={FAQScreen}
          options={{ headerShown: true, 
            headerStyle: {
              backgroundColor: themes.colors.darkRed,
            },
            headerTintColor: themes.colors.white,
            headerTitle: 'Perguntas Frequentes',
          }}/>

          <Stack.Screen name='Campaigns' component={CampaignsScreen}
          options={{ headerShown: true, 
            headerStyle: {
              backgroundColor: themes.colors.darkRed,
            },
            headerTintColor: themes.colors.white,
            headerTitle: 'Campanhas',
          }}/>

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
      
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
