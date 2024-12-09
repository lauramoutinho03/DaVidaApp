import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert, Linking } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';
import { themes } from '../../global/themes';

type FAQProps = StackScreenProps<RootStackParamList, 'FAQ'>;

interface FAQ {
  IdFAQ: number;
  Titulo: string;
  Mensagem: string;
  Link: string;
}

const FAQScreen: React.FC<FAQProps> = ({ route, navigation }) => {
  //const { user } = route.params;
  //const { user, setUser, clearUser } = useUser();
  //const { Dador, Genero, Distrito, TipoSangue } = user;
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          'https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/faq/getFaq', {method: 'POST'} 
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados da API.');
        }

        const data: FAQ[] = await response.json();
        setFaqs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
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
        <Text style={{ color: themes.colors.lightRed }}>{error}</Text>
      </View>
    );
  }

  const handleLinkPress = (link: string) => {
    Alert.alert(
      'Abrir link',
      'Deseja abrir este link na internet?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Ação cancelada'),
          style: 'cancel',
        },
        {
          text: 'Abrir',
          onPress: () => {
            Linking.openURL(link).catch((err) => console.error('Erro ao abrir o link', err));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderFAQItem = ({ item }: { item: FAQ }) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqTitle}>{item.Titulo}</Text>
      <Text style={styles.faqMessage}>{item.Mensagem}</Text>
      {/* <TouchableOpacity onPress={() => item.Link && alert(`Abrir link: ${item.Link}`)}> */}
      <TouchableOpacity onPress={() => item.Link && handleLinkPress(item.Link)}>
        <Text style={styles.faqLink}>Saiba mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={faqs}
        keyExtractor={(item) => item.IdFAQ.toString()}
        renderItem={renderFAQItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default FAQScreen;