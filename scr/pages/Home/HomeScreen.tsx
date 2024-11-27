import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';
import { themes } from '../../global/themes';
import { useUser } from '../../contexts/UserContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/input'; 

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  const { user, setUser, clearUser } = useUser();

  //const [distrito, setDistrito] = useState<string | undefined>();
  const [distrito, setDistrito] = useState('');
  const [data, setData] = useState('');

  return (
    <View style={styles.container}>

      {/* Header com botões de notificações e informações */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('FAQ')} style={styles.buttonHeader}>
            <MaterialIcons name="help-outline" size={27} color={themes.colors.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Campaigns')} style={styles.buttonHeader}>
            <FontAwesome5 name="newspaper" size={25} color={themes.colors.black} />
        </TouchableOpacity>
      </View>

      <Text>Welcome home, {user.Nome}!</Text>

      {/* Botão para realizar marcação */}
      <View style={styles.boxBottom}>
          <Button text="Realizar marcação" />
      </View>
      
    </View>
  );
};

export default HomeScreen;
