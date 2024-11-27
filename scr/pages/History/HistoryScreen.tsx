import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';

type HistoryProps = StackScreenProps<RootStackParamList, 'Home'>;

const HistoryScreen: React.FC<HistoryProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  const { user, setUser, clearUser } = useUser();

  return (
    <View style={styles.container}>
        <Text>Welcome to history, {user.Nome}!</Text>

    </View>
  );
};

export default HistoryScreen;