import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
        <Text>Welcome, {user}!</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{fontWeight: 'bold'}}>LogOut</Text>
        </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
