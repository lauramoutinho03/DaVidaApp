import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert, Linking } from 'react-native';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { themes } from '../../global/themes';
import { useUser } from '../../contexts/UserContext';
import { Button } from '../../components/Button';
//import { Input } from '../../components/input'; 

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

interface InstituicaoData {
  Instituicao: {
    IdInstituicao: number;
    Nome: string;
    Brigada: string;
    Local: string;
    DistritoId: number;
    Horario: string;
    UserId: number;
  };
  Distrito: {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
  };
}

interface DistritoData {
  Id: number;
  Label: string;
  Order: number;
  Is_Active: boolean;
}

interface HorarioData {
  IdHorario: number,
	DiaSemanaId: number,
	HoraAbertura: string,
	HoraFecho: string,
	InstituicaoId: number
}

const diasSemana = [
  { id: 1, label: 'Domingo' },
  { id: 3, label: 'Segunda-feira' },
  { id: 4, label: 'Terça-feira' },
  { id: 5, label: 'Quarta-feira' },
  { id: 7, label: 'Quinta-feira' },
  { id: 6, label: 'Sexta-feira' },
  { id: 2, label: 'Sábado' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  //const { user, setUser, clearUser } = useUser();
  //const { Dador, Genero, Distrito, TipoSangue } = user;
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const [instituicoes, setInstituicoes] = useState<InstituicaoData[]>([]);
  const [filteredInstituicoes, setFilteredInstituicoes] = useState<InstituicaoData[]>([]);
  
  const [distritos, setDistritos] = useState<DistritoData[]>([]);
  const [selectedDistrito, setSelectedDistrito] = useState<string | undefined>();

  const [horarios, setHorarios] = useState<HorarioData[]>([]);
  const [selectedDiaSemana, setSelectedDiaSemana] = useState(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstituicoes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/instituicao/getInstituicoes', 
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error('Erro ao listar as instituições da API.');
      }

      const data: InstituicaoData[] = await response.json();
      setInstituicoes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDistritos = async () => {
    try {
      const response = await fetch(
        'https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/instituicao/getDistritos',
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error('Erro ao listar os distritos da API.');
      }

      const data: DistritoData[] = await response.json();
      setDistritos(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchHorarios = async () => {
    try {
      const response = await fetch('https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/instituicao/getHorario', 
        { method: 'POST' }
      );
      
      if (!response.ok) throw new Error('Erro ao listar os horários.');

      const data: HorarioData[] = await response.json();
      setHorarios(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInstituicoes();
      fetchDistritos();
      fetchHorarios();
    }, [])
  );

/*   // Atualiza as instituições filtradas sempre que o distrito ou as instituições mudam
  useEffect(() => {
    if (selectedDistrito && selectedDistrito !== "Distrito") {
      const filtered = instituicoes.filter(
        (instituicao) => instituicao.Instituicao.DistritoId.toString() === selectedDistrito
      );
      setFilteredInstituicoes(filtered);
    } else {
      setFilteredInstituicoes(instituicoes); // Exibe todas as instituições se "Distrito" estiver selecionado
    }
  }, [selectedDistrito, instituicoes]); */

  useEffect(() => {
    let filtered = instituicoes;
    if (selectedDistrito && selectedDistrito !== 'Distrito') {
      filtered = filtered.filter(inst => inst.Instituicao.DistritoId.toString() === selectedDistrito);
    }
    if (selectedDiaSemana && selectedDiaSemana !== 'Dia Semana') {
      const instituicoesComHorario = filtered.filter(inst => 
        horarios.some(horario => horario.InstituicaoId === inst.Instituicao.IdInstituicao && horario.DiaSemanaId === selectedDiaSemana)
      );
      setFilteredInstituicoes(instituicoesComHorario);
    } else {
      setFilteredInstituicoes(filtered);
    }
  }, [selectedDistrito, selectedDiaSemana, instituicoes, horarios]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  const renderInstituicaoItem = ({ item }: { item: InstituicaoData }) => (
    <View style={styles.instituicaoItem}>
      <Text style={styles.instituicaoNome}>{item.Instituicao.Nome}</Text>
      <TouchableOpacity
      onPress={() => navigation.navigate('Details', { instituicao: item })}
      style={styles.button}>
          <MaterialIcons name="add-circle-outline" size={22} color={themes.colors.black} />
          <Text style={styles.buttonText}>Informações</Text>
      </TouchableOpacity>
    </View>
  );

  const handleOpenLink = () => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente abrir o site de marcação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Abrir',
          onPress: () => Linking.openURL('https://ipst.pt/index.php/pt/'),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header com botões de notificações e informações */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('FAQ')} style={styles.buttonHeader}>
          <MaterialIcons name="help-outline" size={27} color={themes.colors.black} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.toggleButtonLista, viewMode === 'list' && styles.toggleButtonActive,]}
          onPress={() => setViewMode('list')}
        >
          <Text style={[styles.toggleButtonText, viewMode === 'list' && styles.toggleButtonTextActive,]}>
            Lista
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButtonMapa, viewMode === 'map' && styles.toggleButtonActive,]}
          onPress={() => setViewMode('map')}
        >
          <Text style={[styles.toggleButtonText, viewMode === 'map' && styles.toggleButtonTextActive,]}>
            Mapa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Campaigns')} style={styles.buttonHeader}>
          <FontAwesome5 name="newspaper" size={25} color={themes.colors.black} />
        </TouchableOpacity>
      </View>

      {viewMode === 'list' && (
        <>
          <View style={styles.filterContainer}>
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedDistrito}
                onValueChange={(itemValue) => setSelectedDistrito(itemValue)}
              >
                <Picker.Item label="Distrito" value="Distrito" style={styles.pickerText} />
                {distritos.map((distrito) => (
                  <Picker.Item key={distrito.Id} label={distrito.Label} value={distrito.Id.toString()} style={styles.pickerText} />
                ))}
              </Picker>
            </View>
            <View style={styles.picker}>
{/*               <View style={styles.iconInput}>
                <Text style={styles.pickerText}>{"Data"}</Text>
                <FontAwesome name="calendar" size={20} color={themes.colors.darkGrey} />
              </View> */}
              <Picker 
                selectedValue={selectedDiaSemana} 
                onValueChange={(itemValue) => setSelectedDiaSemana(itemValue)}
              >
                <Picker.Item label="Dia Semana" value="Dia Semana" style={styles.pickerText}/>
                {diasSemana.map(d => (
                  <Picker.Item key={d.id} label={d.label} value={d.id} style={styles.pickerText}/>
                ))}
              </Picker>
            </View>
          </View>

          {filteredInstituicoes.length === 0 ? (
            <View style={styles.emptyMessageContainer}>
              <MaterialIcons name="info-outline" size={22} color={themes.colors.darkGrey} />
              <Text style={styles.emptyMessage}>Não há instituições para o distrito ou dia da semana selecionado.</Text>
            </View>
          ) : (
            <FlatList
              data={filteredInstituicoes}
              keyExtractor={(item) => item.Instituicao.IdInstituicao.toString()}
              renderItem={renderInstituicaoItem}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </>
      )}

      {viewMode === 'map' ? (
        <View style={styles.mapPlaceholder}>
          <MaterialIcons name="construction" size={100} color={themes.colors.black} />
          <Text style={styles.mapPlaceholderText}>Mapa em construção</Text>
        </View>
      ) : (
        <View>
          {/* Lista ou mensagem de erro */}
        </View>
      )}

      {/* Botão para realizar marcação */}
      <View style={styles.boxBottom}>
        <Button text="Realizar marcação" onPress={handleOpenLink}/>
      </View>
    </View>
  );
};

export default HomeScreen;
