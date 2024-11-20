import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

import { RootStackParamList } from '../../../types';
import Logo from '../../assets/logo_novo.png';
import { themes } from '../../global/themes';
import { Button } from '../../components/Button';
import { Input } from '../../components/input';

import { styles } from './styles';
import { useSQLiteContext } from 'expo-sqlite';

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const db = useSQLiteContext();

    // function to handle login
    const handleLogin = async() => {
        if(email.length === 0 || password.length === 0){
            Alert.alert('Atenção', 'Por favor, preencha os campos obrigatórios!');
            return;
        }
        try {
            const user = await db.getFirstAsync('SELECT * FROM users WHERE email = ?', [email]);
            if (!user){
                Alert.alert('Erro', 'Email não existe!');
                return;
            }
            const validUser = await db.getFirstAsync('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
            if (validUser) {
                Alert.alert('Sucesso', 'Login efetuado com sucesso!');
                navigation.navigate('Home', {user: email});
            } else {
                Alert.alert('Erro', 'Password incorreta.');
            }
        } catch (error) {
            console.log('Erro durante o login : ', error);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.boxTop}>
                <Image 
                    source={Logo}
                    style={styles.logo}
                    resizeMode="contain"
                />              
            </View>
            <View style={styles.boxMid}>
                <Input 
                    value={email}
                    onChangeText={setEmail}
                    //title="Endereço de e-mail"
                    IconRight={MaterialIcons}
                    iconRightName="email"
                    keyboardType="email-address"
                    placeholder="Endereço de e-mail"
                    placeholderTextColor={themes.colors.placeholderColor}
                />
                <Input 
                    value={password}
                    onChangeText={setPassword}
                    //title="Password"
                    IconRight={Octicons}
                    iconRightName={showPassword?"eye-closed":"eye"}
                    secureTextEntry={showPassword}
                    onIconRightPress={() => setShowPassword(!showPassword)}
                    placeholder="Password"
                    placeholderTextColor={themes.colors.placeholderColor}
                />
            </View>
            <View style={styles.boxBottom}>
                <Button text="Entrar" loading={loading} onPress={handleLogin}/>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textBottom}>Não tem conta? <Text style={{fontWeight: 'bold'}}>Criar conta</Text></Text>
            </TouchableOpacity>
        </View>
  );
};

export default LoginScreen;
