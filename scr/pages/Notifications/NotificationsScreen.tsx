import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { useFocusEffect } from '@react-navigation/native';

import { themes } from '../../global/themes';
import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

type NotificationsScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

interface AlertaData {
  TipoSangue: {
    Id: number,
		Label: string,
		Order: number,
		Is_Active: boolean
  };
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
  Alerta: {
    IdAlerta: number,
		DataAlerta: string,
		InstituicaoId: number,
		TipoSangueId: number,
		DistritoId: number,
		isEnviado: boolean
  };
}


const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  const { user, setUser, clearUser } = useUser();
  //const { Dador, Genero, Distrito, TipoSangue } = user;

  const [alertas, setAlertas] = useState<AlertaData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlertas = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/alerta/getAlertas', 
        { method: 'POST' }
      );
      if (!response.ok) {
        throw new Error('Erro ao listar os alertas da API.');
      }
      const data: AlertaData[] = await response.json();
      setAlertas(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAlertas();
    }, [])
  );

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

  const renderAlertaItem = ({ item }: { item: AlertaData }) => (
    <View style={styles.alertaItem}>
      <Text style={styles.alertaData}>
        <Text style={{ fontWeight: 'bold' }}>Data:</Text> {item.Alerta.DataAlerta.split('T')[0]}
        <Text style={{ fontWeight: 'bold' }}> | Hora:</Text> {item.Alerta.DataAlerta.split('T')[1].split('Z')[0]}
      </Text>
      <Text style={styles.alertaMensagem}>
        <Text style={{ fontWeight: 'bold' }}>Mensagem:</Text> Estamos especialmente carenciados do seu grupo sanguíneo {item.TipoSangue.Label}. Agradecemos que venha dar sangue: {item.Instituicao.Nome}. 
        Obrigado.
      </Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={alertas}
        keyExtractor={(item) => item.Alerta.IdAlerta.toString()}
        renderItem={renderAlertaItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default NotificationsScreen;
