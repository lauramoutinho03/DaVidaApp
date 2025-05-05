import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Alert, TouchableOpacity, FlatList, ActivityIndicator, Modal, Pressable } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';
import { Button } from '../../components/Button';
import { themes } from '../../global/themes';

type HistoryProps = StackScreenProps<RootStackParamList, 'Home'>;

interface DonationData {
  Doacao: {
    IdDoacao: number;
    DadorId: number;
    DataDoacao: string;
    InstituicaoId: number;
  };
  Instituicao: {
    IdInstituicao: number;
    Nome: string;
    Local: string;
    Horario: string;
  };
}  

const niveis = [
    { nome: 'Iniciante', limite: 3 },
    { nome: 'Solidário', limite: 6 },
    { nome: 'Veterano', limite: 10 },
    { nome: 'Lendário', limite: 20 },
  ];

const HistoryScreen: React.FC<HistoryProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  const { user, setUser, clearUser } = useUser();
  const { Dador, Genero, Distrito, TipoSangue } = user;
  const [loading, setLoading] = useState<boolean>(true);
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [monthsRemaining, setMonthsRemaining] = useState<number>(0);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const fetchDonations = async () => {
    try {
      setLoading(true);

      // Fetch data from API
      const response = await fetch(
        `https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/doacao/getDoacoes?IdDador=${Dador.IdDador}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
      }

      const data: DonationData[] = await response.json();

      // Ordena as doações pela data (mais recente primeiro)
      const sortedDonations = data.sort((a, b) => {
        const dateA = new Date(a.Doacao.DataDoacao);
        const dateB = new Date(b.Doacao.DataDoacao);
        return dateB.getTime() - dateA.getTime(); // Maior data primeiro
      });

      setDonations(sortedDonations);

      // Atualiza o countdown com base na doação mais recente
      if (sortedDonations.length > 0) {
        calculateCountdown(sortedDonations[0].Doacao.DataDoacao);
      } else {
        setMonthsRemaining(0);
        setDaysRemaining(0);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as doações. Tente novamente mais tarde.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCountdown = (lastDonationDate: string) => {
    const today = new Date();
    const lastDonation = new Date(lastDonationDate);
    const nextDonation = new Date(lastDonation);

    // Determina o intervalo de doação com base no gênero
    const donationInterval = Dador.GeneroId === 3 ? 3 : 4;
    nextDonation.setMonth(lastDonation.getMonth() + donationInterval);

    if (today < nextDonation) {
      const timeDiff = nextDonation.getTime() - today.getTime();
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      setMonthsRemaining(months);
      setDaysRemaining(days % 30);
    } else {
      setMonthsRemaining(0);
      setDaysRemaining(0);
    }
  };

  // Atualiza a página ao focar
  useFocusEffect(
    useCallback(() => {
      fetchDonations();
    }, [])
  );

  const renderDonationItem = ({ item }: { item: DonationData }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.listText}>
          <Text style={{ fontWeight: 'bold' }}>Local:</Text> {item.Instituicao.Nome || 'Não especificado'}
        </Text>
        <Text style={styles.listText}>
          <Text style={{ fontWeight: 'bold' }}>Data:</Text> {item.Doacao.DataDoacao || '----'}
        </Text>
      </View>
    </View>
  );

  const renderProgress = () => {
    const totalDoacoes = donations.length;
  
    const nivelAtual = niveis.find((nivel, index) =>
      totalDoacoes < nivel.limite || index === niveis.length - 1
    );
  
    const indexAtual = niveis.indexOf(nivelAtual);
    const anteriorLimite = indexAtual === 0 ? 0 : niveis[indexAtual - 1].limite;
    const progressoNivel = ((totalDoacoes - anteriorLimite) / (nivelAtual.limite - anteriorLimite)) * 100;

    const doacoesRestantes = nivelAtual.limite - totalDoacoes;
  
    return (
      <View style={styles.progressContainer}>
        {/* <Text style={styles.title}>Progresso de Doações</Text> */}
        <View style={styles.levelHeader}>
          <Text style={styles.levelText}>Nível: {nivelAtual.nome}</Text>
          <Pressable onPress={() => setModalVisible(true)} style={styles.buttonHeader}>
            <MaterialIcons name="help-outline" size={20} style={{ color:themes.colors.black }} />
          </Pressable>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${Math.min(progressoNivel, 100)}%` }]} />
        </View>
        {indexAtual === niveis.length - 1 ? (
          <Text style={styles.progressText}>
            {totalDoacoes} doações — Nível máximo atingido!
          </Text>
        ) : (
          <Text style={styles.progressText}>
            {totalDoacoes} doações — Faltam {nivelAtual.limite - totalDoacoes} para o próximo nível
          </Text>
        )}

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Níveis de Dador</Text>
              {niveis.map((nivel, index) => (
                <Text key={index} style={styles.modalItem}>
                  • {nivel.nome}: até {nivel.limite} doações
                </Text>
              ))}
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
        
        {/* Contagem */}
        <View style={styles.contagem}>
            <Text style={styles.title}>
              {Dador.Nome}, {monthsRemaining === 0 && daysRemaining === 0 
                ? 'já pode doar novamente!' 
                : 'pode doar novamente em:'}
            </Text>
            <View style={styles.timerContainer}>
                <View style={styles.timerBox}>
                    <Text style={styles.timerText}>{monthsRemaining}</Text>
                    <Text style={styles.timerLabel}>meses</Text>
                </View>
{/*                 <Text style={styles.timerText}>e</Text> */}
                <View style={styles.timerBox}>
                    <Text style={styles.timerText}>{daysRemaining}</Text>
                    <Text style={styles.timerLabel}>dias</Text>
                </View>
            </View>
        </View>
        
      {renderProgress()}
      {/* Histórico */}
      <View style={styles.historico}>
        <Text style={styles.title}>Histórico</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            data={donations}
            keyExtractor={(item) => item.Doacao.IdDoacao.toString()}
            renderItem={renderDonationItem}
            ListEmptyComponent={<Text style={styles.listText}>Nenhuma doação registada.</Text>}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {/* <Button text="Registar nova doação" onPress={() => navigation.navigate('RegisterDonation')} /> */}
        <Button text="Registar doação" onPress={() => navigation.navigate('AddDonation')}/>
      </View>
    </View>
  );
};

export default HistoryScreen;