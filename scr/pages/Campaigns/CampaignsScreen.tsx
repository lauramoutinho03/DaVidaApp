import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';

type CampaignsProps = StackScreenProps<RootStackParamList, 'Campaigns'>;

const CampaignsScreen: React.FC<CampaignsProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  //const { user, setUser, clearUser } = useUser();

  return (
    <View style={styles.container}>
        <Text>Welcome to Campanhas!</Text>

    </View>
  );
};

export default CampaignsScreen;