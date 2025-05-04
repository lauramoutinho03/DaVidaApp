import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
//import { Picker } from '@react-native-picker/picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

import { themes } from '../../global/themes';
import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/input';

type AddDonationScreenProps = StackScreenProps<RootStackParamList, 'AddDonation'>;

interface Institution {
    IdInstituicao: number;
    Nome: string;
  }

const AddDonationScreen: React.FC<AddDonationScreenProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  const { user, setUser, clearUser } = useUser();
  const { Dador } = user;

  // const [institutions, setInstitutions] = useState<Institution[]>([]);
  // const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null);
  // const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  // const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [codigo, setCodigo] = useState('');
  // const [hasPermission, setHasPermission] = useState(null);
  // const [scanned, setScanned] = useState(false);
  // const [scannerVisible, setScannerVisible] = useState(false);

/*   // Fetch institutions from API
  const fetchInstitutions = async () => {
    try {
      const response = await fetch(
        'https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/instituicao/getInstituicoes',
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error(`Erro ao carregar instituições: ${response.statusText}`);
      }

      const data = await response.json();

      // Mapear os dados retornados para extrair informações das instituições
      const mappedInstitutions: Institution[] = data.map((item: any) => ({
        IdInstituicao: item.Instituicao.IdInstituicao,
        Nome: item.Instituicao.Nome,
      }));

      setInstitutions(mappedInstitutions);
      setSelectedInstitution(mappedInstitutions[0]?.IdInstituicao || null); // Selecionar a primeira por padrão
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as instituições.');
      console.error(error);
    }
  }; */

  useEffect(() => {
/*     (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })(); */
  }, []);

  // Handle donation creation
/*   const handleAddDonation = async () => {
    if (!selectedInstitution) {
      Alert.alert('Erro', 'Por favor, selecione uma instituição.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/doacao/createDoacao?IdInstituicao=${selectedInstitution}&IdDador=${Dador.IdDador}&Data=${date.toISOString().split('T')[0]}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error(`Erro ao registar doação: ${response.statusText}`);
      }

      Alert.alert('Sucesso', 'Doação registada com sucesso!');
      navigation.goBack(); // Voltar à tela anterior
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registar a doação.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }; */

  const handleAddDonation = async () => {
    if (!codigo.trim()) {
      Alert.alert('Erro', 'Por favor, insira o código.');
      return;
    }

    try {
      setLoading(true);
      // Substituir por chamada à API de validação do código
      const response = await fetch(
        `https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/doacao/createDoacao?Codigo=${codigo}&IdDador=${Dador.IdDador}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        Alert.alert('Erro', 'Código incorreto.');
        //throw new Error(`Erro ao registar doação: ${response.statusText}`);
      } else {
        Alert.alert('Sucesso', 'Doação registada com sucesso!');
        navigation.goBack();
      }

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registar a doação.');
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
            
            <View style={styles.box}>
                
                <Text style={styles.label}>Realizou uma doação?</Text>
                <Text style={styles.label}>Insira o código fornecido:</Text>

                <Input 
                  value={codigo}
                  onChangeText={setCodigo}
                  IconRight={MaterialIcons}
                  iconRightName="qr-code-2"
                  placeholder="Código"
                  placeholderTextColor={themes.colors.placeholderColor}
                />

                {/* Botão para guardar doação */}
                <View style={styles.buttonContainer}>
                <Button
                    text={loading ? 'Registando...' : 'Registar'}
                    onPress={handleAddDonation}
                    disabled={loading}
                    />
                </View>

            </View>

        </View>
    </View>
  );
};

export default AddDonationScreen;