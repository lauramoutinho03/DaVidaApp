import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { MaterialIcons } from '@expo/vector-icons';

import { themes } from '../../global/themes';
import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';

type CampaignsProps = StackScreenProps<RootStackParamList, 'Campaigns'>;

const CampaignsScreen: React.FC<CampaignsProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  //const { user, setUser, clearUser } = useUser();

  return (
    <View style={styles.container}>
      <MaterialIcons name="construction" size={100} color={themes.colors.black} />
      <Text>Página das campanhas em construção</Text>

    </View>
  );
};

export default CampaignsScreen;