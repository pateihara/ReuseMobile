// screens/Item/AddItem/index.tsx
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

// Chaves para salvar os dados do formulário
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

  // Se não estiver logado, vai para a tela de Login
  useEffect(() => {
    if (!authLoading && !user) {
        navigation.navigate('MainApp', { screen: 'Perfil' });
    }
  }, [authLoading, user, navigation]);

  // Carrega rascunho salvo
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedFormData = await AsyncStorage.getItem(FORM_DATA_KEY);
        const savedStep = await AsyncStorage.getItem(CURRENT_STEP_KEY);

        if (savedFormData) {
          const parsed = JSON.parse(savedFormData);
          setFormData(parsed);
          if (parsed[5]) setAddressData(parsed[5]);
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

  // Salva rascunho
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

  // Sincroniza endereço dentro do formData
  useEffect(() => {
    if (user) {
      setFormData((prev: any) => ({ ...prev, [5]: addressData }));
    }
  }, [addressData, user]);

  const getGeolocatedAddress = async () => {
    setIsLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão de localização negada',
          'Não foi possível obter sua localização. Por favor, habilite a permissão nas configurações.'
        );
        setIsLoadingLocation(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      if (data.address) {
        setAddressData({
          cep: data.address.postcode || '',
          state: data.address.state || '',
          city: data.address.city || data.address.town || '',
          neighborhood: data.address.suburb || data.address.neighbourhood || '',
          street: data.address.road || '',
          number: data.address.house_number || '',
          complement: '',
        });
      } else {
        Alert.alert('Erro', 'Não foi possível encontrar um endereço para sua localização.');
      }
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
      Alert.alert(
        'Permissão necessária',
        'Precisamos da permissão para acessar sua câmera para que você possa tirar fotos.'
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      const updatedImages = [...images, newImageUri].slice(0, 5); // até 5
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

      // gera id simples incremental
      const nextId = items.length > 0 ? Math.max(...items.map((it: any) => it.id || 0)) + 1 : 1;

      const newItem = {
        id: String(nextId),
        ...formData,
      };

      const updatedItems = [...items, newItem];
      await AsyncStorage.setItem('@items', JSON.stringify(updatedItems));

      // vai para o feedback (AppStack) com o item
      navigation.navigate('FeedbackAddItem', { item: newItem });

      // limpa rascunho
      await AsyncStorage.removeItem(FORM_DATA_KEY);
      await AsyncStorage.removeItem(CURRENT_STEP_KEY);
    } catch (e) {
      console.error('Erro ao publicar o item:', e);
      Alert.alert('Erro', 'Não foi possível publicar o item. Tente novamente mais tarde.');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
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
            // Volta para a Home da Tab:
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
                onChangeText={(t) => handleAddressChange('cep', t)}
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
