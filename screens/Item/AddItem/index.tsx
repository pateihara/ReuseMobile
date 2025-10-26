import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator
} from 'react-native';
import Header from '../../../src/components/Header';
import Card from '../../../src/components/Cards/Card';
import Button from '../../../src/components/Button';
import { Colors } from '../../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

import { AppStackParamList } from '../../../src/types/navigation';
import { useAuth } from '../../../context/AuthContext';
import { fetchJson } from '../../../src/services/api';

const FORM_DATA_KEY = '@addItemFormData';
const CURRENT_STEP_KEY = '@addItemCurrentStep';

type Step = {
  title: string;
  question: string;
  description: string;
  placeholder?: string;
  type?: 'text' | 'select' | 'radio' | 'camera' | 'location';
  options?: string[];
};

const steps: Step[] = [
  {
    title: 'Passo 1 de 6',
    question: 'Qual é o nome do item?',
    description: 'ex.: “Camiseta preta tamanho M”, “Livro Dom Casmurro”, “Celular Samsung Galaxy S10”',
    placeholder: 'escreva aqui...',
    type: 'text',
  },
  {
    title: 'Passo 2 de 6',
    question: 'Como você descreveria o item?',
    description: 'Detalhes como marca, modelo, uso, pequenas observações…',
    placeholder: 'escreva aqui...',
    type: 'text',
  },
  {
    title: 'Passo 3 de 6',
    question: 'Em qual categoria o item se encaixa?',
    description: 'Escolher a categoria certa facilita para que outras pessoas encontrem seu item rapidamente.',
    placeholder: 'escolha um valor',
    type: 'select',
    options: ['Eletrônicos', 'Roupas', 'Livros', 'Móveis', 'Outros'],
  },
  {
    title: 'Passo 4 de 6',
    question: 'Qual é o estado de conservação?',
    description: 'Seja transparente: isso aumenta a confiança e facilita a troca.',
    type: 'radio',
    options: [
      'Usado, mas sem problemas na peça',
      'Usado, mas com algum tipo de defeito',
      'Usado, mas com problemas que possam impedir o uso',
    ],
  },
  {
    title: 'Passo 5 de 6',
    question: 'Adicione as melhores fotos do item',
    description: 'Até 5 imagens, em boa iluminação.',
    type: 'camera',
  },
  {
    title: 'Passo 6 de 6',
    question: 'Qual é a localização do item?',
    description: 'Isso ajuda pessoas por perto a encontrarem seu item. Nunca mostramos seu endereço exato.',
    type: 'location',
  },
];

type Nav = NativeStackNavigationProp<AppStackParamList>;

const AddItem: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { user, loading: authLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState(
    steps[2].options?.map((opt) => ({ label: opt, value: opt })) || []
  );
  const [images, setImages] = useState<string[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [addressData, setAddressData] = useState({
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',
  });

  const step = steps[currentStep];

  useEffect(() => {
    if (!authLoading && !user) {
      // manda pra aba Perfil, que tem os botões Login/Register
      navigation.navigate('MainApp', { screen: 'Perfil' });
    }
  }, [authLoading, user, navigation]);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedFormData = await AsyncStorage.getItem(FORM_DATA_KEY);
        const savedStep = await AsyncStorage.getItem(CURRENT_STEP_KEY);

        if (savedFormData) {
          const parsed = JSON.parse(savedFormData);
          setFormData(parsed);
          if (parsed[5]) setAddressData(parsed[5]);
          if (parsed[4]) setImages(parsed[4]);
        }
        if (savedStep) {
          setCurrentStep(parseInt(savedStep, 10));
        }
      } catch (e) {
        console.error('Erro ao carregar dados do AsyncStorage:', e);
      }
    };
    if (user) loadSavedData();
  }, [user]);

  useEffect(() => {
    const saveFormData = async () => {
      try {
        await AsyncStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
        await AsyncStorage.setItem(CURRENT_STEP_KEY, String(currentStep));
      } catch (e) {
        console.error('Erro ao salvar dados no AsyncStorage:', e);
      }
    };
    if (user) saveFormData();
  }, [formData, currentStep, user]);

  useEffect(() => {
    if (user) {
      setFormData((prev: any) => ({ ...prev, [5]: addressData }));
    }
  }, [addressData, user]);

  const fetchViaCEP = async (cepRaw: string) => {
    const cep = cepRaw.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
      const data = await fetchJson<{ uf: string; localidade: string; bairro: string; logradouro: string; erro?: boolean }>(
        `https://viacep.com.br/ws/${cep}/json/`,
        { cacheKey: `viacep:${cep}`, ttlMs: 10 * 60 * 1000 }
      );
      if (data?.erro) {
        Alert.alert('CEP inválido', 'Não encontramos esse CEP.');
        return;
      }
      setAddressData((prev) => ({
        ...prev,
        cep,
        state: data.uf ?? '',
        city: data.localidade ?? '',
        neighborhood: data.bairro ?? '',
        street: data.logradouro ?? '',
      }));
    } catch (e) {
      console.error('Erro ViaCEP:', e);
      Alert.alert('Erro', 'Não foi possível consultar o CEP agora.');
    }
  };

  const getGeolocatedAddress = async () => {
    setIsLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização negada', 'Habilite a permissão nas configurações.');
        setIsLoadingLocation(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = currentLocation.coords;

      // Reverse geocoding com mais detalhe + headers obrigatórios
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&zoom=18&lat=${latitude}&lon=${longitude}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'ReuseMobile/1.0 (contato: reusemobile@example.com)', // troque por um contato seu
          'Accept-Language': 'pt-BR',
        },
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Reverse geocoding HTTP ${res.status} :: ${txt.slice(0, 120)}`);
      }
      const data = await res.json();

      const a = data.address ?? {};
      // Fallback robusto de bairro/subdistrito
      const bairroNominatim =
        a.suburb ||
        a.neighbourhood ||
        a.city_district ||
        a.borough ||
        '';

      // Pré-preenche com Nominatim
      let next = {
        cep: (a.postcode as string) || '',
        state: (a.state as string) || '',
        city: (a.city as string) || (a.town as string) || (a.village as string) || '',
        neighborhood: (bairroNominatim as string) || '',
        street: (a.road as string) || '',
        number: (a.house_number as string) || '',
        complement: '',
      };

      // Se veio CEP, normaliza com ViaCEP (oficial BR)
      if (next.cep && /^\d{5}-?\d{3}$/.test(next.cep)) {
        const cepDigits = next.cep.replace(/\D/g, '');
        try {
          const via = await fetchJson<{ uf?: string; localidade?: string; bairro?: string; logradouro?: string; erro?: boolean }>(
            `https://viacep.com.br/ws/${cepDigits}/json/`,
            { cacheKey: `viacep:${cepDigits}`, ttlMs: 24 * 60 * 60 * 1000 }
          );
          if (!via?.erro) {
            next = {
              ...next,
              state: via.uf ?? next.state,
              city: via.localidade ?? next.city,
              neighborhood: via.bairro || next.neighborhood, // <- corrige bairro oficial
              street: via.logradouro || next.street,
            };
          }
        } catch {
          // Se ViaCEP falhar, mantém dados do Nominatim
        }
      }

      setAddressData(next);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Não foi possível obter a sua localização. Tente novamente mais tarde.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita acesso à câmera para tirar fotos.');
      return;
    }

    // Mantém MediaTypeOptions para compatibilidade com a sua versão instalada
    // Se você atualizar: troque por `ImagePicker.MediaType.Images`
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // <- compat
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      const updatedImages = [...images, newImageUri].slice(0, 5);
      setImages(updatedImages);
      setFormData({ ...formData, [currentStep]: updatedImages });
    }
  };

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      await publishItem();
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const publishItem = async () => {
    try {
      const existingItems = await AsyncStorage.getItem('@items');
      const items = existingItems ? JSON.parse(existingItems) : [];

      const nextId = items.length > 0 ? Math.max(...items.map((it: any) => Number(it.id) || 0)) + 1 : 1;

      const newItem = {
        id: String(nextId),
        ...formData,
      };

      const updatedItems = [...items, newItem];
      await AsyncStorage.setItem('@items', JSON.stringify(updatedItems));

      navigation.navigate('FeedbackAddItem', { item: newItem });

      await AsyncStorage.removeItem(FORM_DATA_KEY);
      await AsyncStorage.removeItem(CURRENT_STEP_KEY);
    } catch (e) {
      console.error('Erro ao publicar o item:', e);
      Alert.alert('Erro', 'Não foi possível publicar o item. Tente novamente mais tarde.');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar Cadastro',
      'Você tem certeza que deseja cancelar? Todo o progresso será perdido.',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await AsyncStorage.removeItem(FORM_DATA_KEY);
            await AsyncStorage.removeItem(CURRENT_STEP_KEY);
            setFormData({});
            setCurrentStep(0);
            navigation.navigate('MainApp', { screen: 'Início' });
          },
        },
      ]
    );
  };

  const handleChange = (val: string) => {
    setFormData({ ...formData, [currentStep]: val });
  };

  const handleAddressChange = (field: string, val: string) => {
    setAddressData((prev) => ({ ...prev, [field]: val }));
  };

  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={styles.loadingText}>Verificando seu login...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header type="page" pageTitle="Publicar Item" />

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.question}>{step.question}</Text>
          <Text style={styles.description}>{step.description}</Text>

          {step.type === 'text' && (
            <TextInput
              style={styles.input}
              placeholder={step.placeholder}
              value={formData[currentStep] || ''}
              onChangeText={handleChange}
            />
          )}

          {step.type === 'select' && (
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue as any}
              setItems={setItems}
              placeholder={step.placeholder}
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              dropDownContainerStyle={styles.dropdownListContainer}
              listMode="SCROLLVIEW"  // <- evita FlatList interno (sem warning de VirtualizedList)
              onSelectItem={(item) => handleChange(String(item.value))}
            />
          )}

          {step.type === 'radio' && (
            <View>
              {step.options?.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  onPress={() => handleChange(opt)}
                  style={styles.optionButton}
                >
                  <Ionicons
                    name={formData[currentStep] === opt ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={Colors.light.primary}
                  />
                  <Text style={{ marginLeft: 8 }}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {step.type === 'camera' && (
            <View style={styles.cameraContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
                <Ionicons name="camera-outline" size={40} color={Colors.light.primary} />
                <Text style={styles.cameraButtonText}>Tirar foto</Text>
              </TouchableOpacity>
              <View style={styles.imagePreviewContainer}>
                {images.map((uri, idx) => (
                  <Image key={idx} source={{ uri }} style={styles.imagePreview} />
                ))}
              </View>
            </View>
          )}

          {step.type === 'location' && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationTitle}>Obter Localização Automática</Text>
              <TouchableOpacity
                style={styles.locationButton}
                onPress={getGeolocatedAddress}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <ActivityIndicator size="small" color={Colors.light.primary} />
                ) : (
                  <>
                    <Ionicons name="location-outline" size={30} color={Colors.light.primary} />
                    <Text style={styles.locationButtonText}>Obter Localização Atual</Text>
                  </>
                )}
              </TouchableOpacity>

              <Text style={styles.manualEntryTitle}>Ou preencha manualmente:</Text>
              <TextInput
                style={styles.input}
                placeholder="CEP"
                value={addressData.cep}
                onChangeText={(t) => {
                  const onlyDigits = t.replace(/\D/g, '').slice(0, 8);
                  handleAddressChange('cep', onlyDigits);
                  if (onlyDigits.length === 8) fetchViaCEP(onlyDigits);
                }}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Estado"
                value={addressData.state}
                onChangeText={(t) => handleAddressChange('state', t)}
              />
              <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={addressData.city}
                onChangeText={(t) => handleAddressChange('city', t)}
              />
              <TextInput
                style={styles.input}
                placeholder="Bairro"
                value={addressData.neighborhood}
                onChangeText={(t) => handleAddressChange('neighborhood', t)}
              />
              <TextInput
                style={styles.input}
                placeholder="Rua"
                value={addressData.street}
                onChangeText={(t) => handleAddressChange('street', t)}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.inputHalf]}
                  placeholder="Número"
                  value={addressData.number}
                  onChangeText={(t) => handleAddressChange('number', t)}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.inputHalf]}
                  placeholder="Complemento"
                  value={addressData.complement}
                  onChangeText={(t) => handleAddressChange('complement', t)}
                />
              </View>
            </View>
          )}
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 0 && (
          <Button
            title="Voltar"
            variant="secondary"
            onPress={handleBack}
            style={styles.footerButton}
          />
        )}
        <Button
          title="Cancelar"
          variant="danger"
          onPress={handleCancel}
          style={styles.footerButton}
        />
        <Button
          title={currentStep === steps.length - 1 ? 'Publicar Item' : 'Continuar'}
          variant={currentStep === steps.length - 1 ? 'success' : 'primary'}
          onPress={handleNext}
          style={styles.footerButton}
        />
      </View>
    </View>
  );
};

export default AddItem;
