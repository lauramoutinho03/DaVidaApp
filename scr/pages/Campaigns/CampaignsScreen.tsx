import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert, Image, ScrollView, RefreshControl} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { MaterialIcons } from '@expo/vector-icons';

import { themes } from '../../global/themes';
import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';

type CampaignsProps = StackScreenProps<RootStackParamList, 'Campaigns'>;

interface CampanhaData {
  IdCampanha: number;
  DataCampanha: string;
  Titulo: string;
  Mensagem: string;
  InstituicaoId: number;
  Ficheiro?: string; // Para base64 ou URI
}

const CampaignsScreen: React.FC<CampaignsProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  //const { user, setUser, clearUser } = useUser();
  const [campanhas, setCampanhas] = useState<CampanhaData[]>([]);
  const [expandedCampaigns, setExpandedCampaigns] = useState<number[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchCampanhas = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/campanha/getCampanhas', 
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error('Erro ao listar as campanhas da API.');
      }

      const data: CampanhaData[] = await response.json();
      setCampanhas(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampanhas();
  }, []);

  // Função chamada ao puxar para atualizar
  const onRefresh = async () => {
    setRefreshing(true); // Começa o refresh
    await fetchCampanhas(); // Espera carregar os dados
    setRefreshing(false); // Finaliza o refresh
  };
  
  
  const toggleExpand = (id: number) => {
    setExpandedCampaigns((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const renderCampaignItem = ({ item }: { item: CampanhaData }) => {
    const isExpanded = expandedCampaigns.includes(item.IdCampanha);

    return (
      <View style={styles.campaignItem}>
        <View style={styles.campaignHeader}>
          <Text style={styles.campaignTitle} numberOfLines={10} ellipsizeMode="tail">{item.Titulo}</Text>
          
          <TouchableOpacity onPress={() => toggleExpand(item.IdCampanha)} style={styles.expandButton}>
            <MaterialIcons
              name={isExpanded ? 'remove-circle-outline' : 'add-circle-outline'}
              size={24}
              color={themes.colors.black}
            />
            <Text style={styles.expandButtonText}>Informações</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.campaignData}>{item.DataCampanha}</Text>
        {isExpanded && (
          <View style={styles.campaignDetails}>
            <Text style={styles.campaignDescription}>{item.Mensagem}</Text>
            {item.Ficheiro && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.Ficheiro}` }}
                style={styles.campaignImage}
              />
            )}
          </View>
        )}
      </View>
    );
  };

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

  return (
    <View style={styles.container}>
      {campanhas.length > 0 ? (
        <FlatList
          data={campanhas}
          keyExtractor={(item) => item.IdCampanha.toString()}
          renderItem={renderCampaignItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <MaterialIcons name="info" size={50} color={themes.colors.darkGrey} />
          <Text style={styles.noDataText}>Nenhuma campanha disponível no momento.</Text>
        </View>
      )}
    </View>
  );
};

export default CampaignsScreen;