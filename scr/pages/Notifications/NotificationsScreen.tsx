import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { themes } from '../../global/themes';
import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

type NotificationsScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  const { user, setUser, clearUser } = useUser();
  const { Dador, Genero, Distrito, TipoSangue } = user;

  return (
    <View style={styles.container}>
        {/* <Text>Welcome to notifications, {Dador.Nome}!</Text> */}
        <MaterialIcons name="construction" size={100} color={themes.colors.black} />
        <Text>Página das notificações em construção</Text>

    </View>
  );
};

export default NotificationsScreen;
