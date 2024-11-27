import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';

type FAQProps = StackScreenProps<RootStackParamList, 'Home'>;

const FAQScreen: React.FC<FAQProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  //const { user, setUser, clearUser } = useUser();

  return (
    <View style={styles.container}>
        <Text>Welcome to FAQ!</Text>

    </View>
  );
};

export default FAQScreen;