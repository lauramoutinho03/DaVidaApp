import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

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


const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  //const { user, setUser, clearUser } = useUser();
  //const { Dador, Genero, Distrito, TipoSangue } = user;

  const [instituicoes, setInstituicoes] = useState<InstituicaoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstituicoes = async () => {
      try {
        const response = await fetch(
          'https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/instituicao/getInstituicoes', {method: 'POST'}
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar as instituições da API.');
        }

        const data: InstituicaoData[] = await response.json();
        setInstituicoes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstituicoes();
  }, []);

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
      {/* <Button
        text="Ver Detalhes"
        onPress={() =>
          navigation.navigate('Details', { instituicao: item })
        }
      /> */}
      <TouchableOpacity
      onPress={() => navigation.navigate('Details', { instituicao: item })}
      style={styles.button}>
          <MaterialIcons name="add-circle-outline" size={22} color={themes.colors.black} />
          <Text style={styles.buttonText}>Informações</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header com botões de notificações e informações */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('FAQ')} style={styles.buttonHeader}>
          <MaterialIcons name="help-outline" size={27} color={themes.colors.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Campaigns')} style={styles.buttonHeader}>
          <FontAwesome5 name="newspaper" size={25} color={themes.colors.black} />
        </TouchableOpacity>
      </View>

      {/* Lista de Instituições */}
      <FlatList
        data={instituicoes}
        keyExtractor={(item) => item.Instituicao.IdInstituicao.toString()}
        renderItem={renderInstituicaoItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Botão para realizar marcação */}
      <View style={styles.boxBottom}>
        <Button text="Realizar marcação" />
      </View>
    </View>
  );
};

export default HomeScreen;
