import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';

type DetailsProps = StackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<DetailsProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  //const { user, setUser, clearUser } = useUser();
  const { instituicao } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>

        <Text style={styles.title}>{instituicao.Instituicao.Nome}</Text>
        
        <Text style={styles.details}>
            <Text style={{ fontWeight: 'bold' }}>Brigada:</Text> {instituicao.Instituicao.Brigada}
        </Text>
        
        <Text style={styles.details}>
            <Text style={{ fontWeight: 'bold' }}>Local:</Text> {instituicao.Instituicao.Local}
        </Text>

        <Text style={styles.details}>
            <Text style={{ fontWeight: 'bold' }}>Distrito:</Text> {instituicao.Distrito.Label}
        </Text>

      </View>
      
    </View>
  );
};

export default DetailsScreen;