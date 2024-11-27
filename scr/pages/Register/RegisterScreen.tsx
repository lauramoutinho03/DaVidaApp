import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
//import { useSQLiteContext } from 'expo-sqlite';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';
import Logo from '../../assets/logo_novo.png';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';

// import Selector ??

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [genero, setGenero] = useState<string | undefined>();
    
    const [dataNasc, setDataNasc] = useState('');

    const [nif, setNIF] = useState('');
    const [numUtente, setNumUtente] = useState('');
    const [distrito, setDistrito] = useState<string | undefined>();
    const [tipoSangue, setTipoSangue] = useState<string | undefined>();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    //const db = useSQLiteContext();

    // function to handle registration
    const handleRegister = async() => {
        if (nome.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0){
            Alert.alert('Atenção', 'Por favor, preencha os campos obrigatórios!');
            return;
        }
        if (password != confirmPassword){
            Alert.alert('Erro', 'As passwords não coincidem!');
            return;
        }
        // https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/register/register?Nome={Nome}&Email={Email}&Password={Password}

        setLoading(true);

        try {
            const response = await fetch('https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/register/register?Nome=' + nome + '&Email=' + email + '&Password=' + password, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, password })
            });
            
            // Obtém a resposta como texto
            const responseText = await response.text(); 

            // Verifica a resposta para 'sucesso' ou 'erro'
            if (responseText.toLowerCase() === 'sucesso') {
                Alert.alert('Sucesso', 'Registo efetuado com sucesso!');
                navigation.navigate('Login'); // Navega para a tela de login
            } else if (responseText.toLowerCase() === 'erro') {
                Alert.alert('Erro', 'O email já está registado.');
            } else {
                Alert.alert('Erro', 'Ocorreu um problema ao registar-se. Tente novamente mais tarde.');
            }
        } catch (error) {
        console.error('Erro durante o registo: ', error);
        Alert.alert('Erro', 'Ocorreu um problema. Por favor, tente novamente.');
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
                    value={nome}
                    onChangeText={setNome}

                    IconRight={MaterialIcons}
                    iconRightName="person"
                    placeholder="Nome completo"
                    placeholderTextColor={themes.colors.placeholderColor}
                />
                <Input 
                    value={email}
                    onChangeText={setEmail}
                    IconRight={MaterialIcons}
                    iconRightName="email"
                    placeholder="E-mail"
                    placeholderTextColor={themes.colors.placeholderColor}
                    keyboardType="email-address"
                />

                <Input 
                    value={password}
                    onChangeText={setPassword}
                    IconRight={MaterialIcons}
                    iconRightName="key"
                    placeholder="Password"
                    placeholderTextColor={themes.colors.placeholderColor}
                />
                <Input 
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    IconRight={MaterialIcons}
                    iconRightName="key"
                    placeholder="Confirmar Password"
                    placeholderTextColor={themes.colors.placeholderColor}
                />

                <View style={styles.boxBottom}>
                    <Button text="Registar" loading={loading} onPress={handleRegister}/>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textBottom}>Já tem conta? <Text style={{fontWeight: 'bold'}}>Entrar</Text></Text>
            </TouchableOpacity>
        
        </View>
  );
};

export default RegisterScreen;
