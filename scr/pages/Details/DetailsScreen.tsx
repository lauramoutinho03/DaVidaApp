import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { themes } from '../../global/themes';
import { useUser } from '../../contexts/UserContext';

type DetailsProps = StackScreenProps<RootStackParamList, 'Details'>;

interface StockData {
  TipoSangue: {
    Label: string;
  };
  Stock: {
    QuantidadeAtual: number;
  };
  ParametrosNecessidade: {
    QuantidadeMinima: number;
  };
}

interface HorarioData {
  Horario: {
    IdHorario: number,
    DiaSemanaId: number,
    HoraAbertura: string,
    HoraFecho: string,
    InstituicaoId: number
  },
  DiaSemana: {
    Id: number,
    Label: string,
    Order: number,
    Is_Active: boolean
  }
}

const coracoes = (nivel: number) => {
  const total = 5;
  return (
    <View style={styles.nivelContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <MaterialIcons
          key={index}
          name="favorite"
          size={24}
          color={index < nivel ? themes.colors.darkRed : themes.colors.lightGrey}
        />
      ))}
    </View>
  );
};


const DetailsScreen: React.FC<DetailsProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  //const { user, setUser, clearUser } = useUser();
  const { instituicao } = route.params;
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [horarios, setHorarios] = useState<HorarioData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchStocks = async () => {
    try {
      if (!refreshing) setLoading(true); // Só mostra o loader inicial se não estiver em refresh
      const response = await fetch(
        `https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/instituicao/getStocksByInstituicao?IdInstituicao=${instituicao.Instituicao.IdInstituicao}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Erro ao buscar os níveis de stock:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Encerra o pull-to-refresh
    }
  };

  const fetchHorarios = async () => {
    try {
      //if (!refreshing) setLoading(true); // Só mostra o loader inicial se não estiver em refresh
      setLoading(true);
      const response = await fetch(
        `https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/instituicao/getHorarioByInstituicaoId?InstituicaoId=${instituicao.Instituicao.IdInstituicao}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setHorarios(data);
    } catch (error) {
      console.error('Erro ao buscar os horários da instituição:', error);
    } finally {
      setLoading(false);
      //setRefreshing(false); // Encerra o pull-to-refresh
    }
  };

  useEffect(() => {
    fetchStocks();
    fetchHorarios();
  }, [instituicao]);

  // Função chamada ao puxar para atualizar
  const onRefresh = () => {
    setRefreshing(true);
    fetchStocks();
    fetchHorarios();
  };

  // Função para exibir o horário
  const renderHorario = (horario: HorarioData) => {
    const { Horario, DiaSemana  } = horario;
     // Verifica se as horas de abertura e fechamento estão presentes
    const horaAbertura = Horario.HoraAbertura || "0";
    const horaFecho = Horario.HoraFecho || "0";

    const horarioFormatado =
    horaAbertura === "0" || horaFecho === "0"
      ? "Sem horário"
      : `${horaAbertura.split(":").slice(0, 2).join("h")} - ${horaFecho.split(":").slice(0, 2).join("h")}`;

    return (
      <View style={styles.horarioRow} key={DiaSemana.Id}>
        <Text style={styles.diaSemanaText}>{DiaSemana.Label}</Text>
        <Text style={styles.horaText}>
          {horarioFormatado}
        </Text>
      </View>
    );
  };


  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{instituicao.Instituicao.Nome}</Text>
        
        <Text style={styles.details}>
          <Text style={{ fontWeight: 'bold' }}>Brigada:</Text> {instituicao.Instituicao.Brigada}
        </Text>
        
        <Text style={styles.details}>
          <Text style={{ fontWeight: 'bold' }}>Local:</Text> {instituicao.Instituicao.Local}
        </Text>

        <Text style={styles.details}>
          <Text style={{ fontWeight: 'bold' }}>Distrito:</Text> {instituicao.Distrito.Label}
        </Text>

{/*         <Text style={styles.details}>
          <Text style={{ fontWeight: 'bold' }}>Horário:</Text> {instituicao.Instituicao.Horario}
        </Text> */}

        <Text style={styles.sectionTitle}>Horário de Funcionamento:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.horariosContainer}>
            {horarios&& horarios.length > 0 ? (
              horarios.map((horario) => renderHorario(horario))
            ) : (
              <Text style={styles.noHorariosText}>Não há horários disponíveis.</Text>
            )}
          </View>
        )}

        <Text style={styles.sectionTitle}>Níveis de necessidade por tipo sanguíneo:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.niveisContainer}>
            {stocks.map((item) => {
              const { QuantidadeAtual } = item.Stock;
              const { QuantidadeMinima } = item.ParametrosNecessidade;
              const { Label } = item.TipoSangue;

              // Calcula o número de corações preenchidos (1 coração = 20%)
              const nivel = Math.min(5, Math.floor(QuantidadeAtual / QuantidadeMinima));

              return (
                <View key={Label} style={styles.nivelRow}>
                  <Text style={styles.tipoText}>{Label}</Text>
                  {coracoes(nivel)}
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.legendaContainer}>
          <MaterialIcons name="info-outline" size={22} color={themes.colors.black} />
          <Text style={styles.legendaText}>
            (Quantos mais corações preenchidos menor é a necessidade)
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;