import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(
          `https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/instituicao/getStocksByInstituicao?IdInstituicao=${instituicao.Instituicao.IdInstituicao}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error('Erro ao buscar os níveis de stock:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [instituicao]);

  return (
    <View style={styles.container}>
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

        <Text style={styles.details}>
            <Text style={{ fontWeight: 'bold' }}>Horário:</Text> {instituicao.Instituicao.Horario}
        </Text>

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
              const nivel = Math.min(5, Math.floor(QuantidadeAtual / QuantidadeMinima));            ;

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
          <Text style={styles.legendaText}>(Quantos mais corações preenchidos menor é a necessidade)</Text>
        </View>

      </View>
      
    </View>
  );
};

export default DetailsScreen;