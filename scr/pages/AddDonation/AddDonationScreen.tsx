import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';
import { Button } from '../../components/Button';

type AddDonationScreenProps = StackScreenProps<RootStackParamList, 'AddDonation'>;

interface Institution {
    IdInstituicao: number;
    Nome: string;
  }

const AddDonationScreen: React.FC<AddDonationScreenProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  const { user, setUser, clearUser } = useUser();
  const { Dador } = user;

  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Fetch institutions from API
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
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  // Handle donation creation
  const handleAddDonation = async () => {
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
  };

  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
            
            <View style={styles.box}>
                
                <Text style={styles.label}>Selecione a instituição:</Text>
                {/* Dropdown para selecionar instituição */}
                <View style={styles.pickerContainer}>
                    
                    <Picker
                        selectedValue={selectedInstitution}
                        onValueChange={(itemValue) => setSelectedInstitution(Number(itemValue))}
                    >
                        {institutions.map((institution) => (
                        <Picker.Item
                            key={institution.IdInstituicao}
                            label={institution.Nome}
                            value={institution.IdInstituicao}
                        />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Selecione a data da doação:</Text>
                {/* Seletor de data */}
                <View style={styles.datePickerContainer}>
                    <TouchableOpacity 
                        onPress={() => setShowDatePicker(true)} 
                        style={styles.datePickerButton} // Botão com alinhamento horizontal
                    >
                        <Text style={styles.dateText}>{date.toDateString()}</Text>
                        <FontAwesome name="calendar" size={24} color="black" style={styles.icon} />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={'default'}
                            onChange={(_, selectedDate) => {
                                if (selectedDate) {
                                    setDate(selectedDate);
                                }
                                setShowDatePicker(false); // Fecha o seletor
                            }}
                        />
                    )}
                </View>

                {/* Botão para guardar doação */}
                <View style={styles.buttonContainer}>
                    <Button
                        text={loading ? 'Guardando...' : 'Guardar doação'}
                        onPress={handleAddDonation}
                        disabled={loading}
                    />
                </View>

            </View>
{/* 
            <View style={styles.boxBottom}>
                <Button text="Guardar doação"/>
            </View> */}
        </View>
    </View>
  );
};

export default AddDonationScreen;