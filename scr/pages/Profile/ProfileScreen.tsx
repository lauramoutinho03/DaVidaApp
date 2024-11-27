import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';
import { themes } from '../../global/themes';
import { Button } from '../../components/Button';
import { useUser } from '../../contexts/UserContext';

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  const { user, setUser, clearUser } = useUser();

  return (
    <View style={styles.container}>

        <View style={styles.sairContainer}>
            <Button text="Logout" onPress={() => navigation.navigate('Login')} style={styles.sairButton}/>
        </View>


        <View style={styles.infoContainer}>
            <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Nome:</Text> {user.Nome}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Género:</Text> {user.Nome}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Data de Nascimento:</Text> {user.Nome}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>NIF:</Text> {user.Nome}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Nº utente:</Text> {user.Nome}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Distrito:</Text> {user.Nome}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Tipo sanguíneo:</Text> {user.Nome}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Email:</Text> {user.Email}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Telefone:</Text> {user.Nome}
            </Text>

            <View style={styles.boxBottom}>
                <Button text="Editar Perfil" />
            </View>
        </View>

    
    </View>
  );
};

export default ProfileScreen;
