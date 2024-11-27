import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';

type NotificationsScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  const { user, setUser, clearUser } = useUser();

  return (
    <View style={styles.container}>
        <Text>Welcome to notifications, {user.Nome}!</Text>

    </View>
  );
};

export default NotificationsScreen;
