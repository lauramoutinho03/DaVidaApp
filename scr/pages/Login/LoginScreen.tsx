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

import { useUser } from '../../contexts/UserContext';
//import { useSQLiteContext } from 'expo-sqlite';
//import api from '../../api/api';

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const { setUser } = useUser();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    //const db = useSQLiteContext();

    // function to handle login
    const handleLogin = async () => {
        if (email.length === 0 || password.length === 0) {
            Alert.alert('Atenção', 'Por favor, preencha os campos obrigatórios!');
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await fetch('https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/login/login?Email=' + email + '&Password=' + password, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                Alert.alert('Sucesso', 'Login efetuado com sucesso!');
                navigation.navigate('Home');
                //navigation.navigate('Home', { user: data });
            } else {
                Alert.alert('Erro', 'Login falhou! Verifique as suas credenciais.');
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
            Alert.alert('Erro', error.message || 'Algo deu errado. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };
    


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
