import { addPlace as addPlaceApi } from '@/src/api/placesApi';
import { useMapPicker } from '@/src/contexts/MapPickerContext';
import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddPlaceScreen() {
    // Required fields and their error messages
    const requiredFields = {
      name: 'Name is required.',
      info: 'Description is required.',
      category: 'Category is required.',
      lat: 'Latitude is required.',
      lng: 'Longitude is required.',
      image: 'Please select an image for your place.',
    };
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const { selectedCoordinates, clearCoordinates } = useMapPicker();

  const [image, setImage] = useState(null); // Image from camera or gallery

  const [formData, setFormData] = useState({
    name: '',
    info: '',
    category: '', 
    lat: 47.2692,
    lng: 11.4041,
    rating: 0,
    distance: 0,
    access: 'Public',
    image: null,
  });

  {/*Categories, used for dropdown menue*/}
  const [open, setOpen] = useState(false);
        const [items, setItems] = useState([
          { label: 'Park', value: 'Park' },
          { label: 'Museum', value: 'Museum' },
          { label: 'Café', value: 'Cafe' },
          { label: 'Garden', value: 'Garden' },
          { label: 'Promenade', value: 'Promenade' },
          { label: 'Mountain', value: 'Mountain' },
          { label: 'District', value: 'District' },
          { label: 'Sea', value: 'Sea' },
        ]);

  // Update coordinates when returning from map picker
  useEffect(() => {
    if (selectedCoordinates) {
      setFormData(prev => ({
        ...prev,
        lat: selectedCoordinates.lat,
        lng: selectedCoordinates.lng,
      }));
      clearCoordinates(); // Clear after using
    }
  }, [selectedCoordinates]);

  {/*Function to pick image using camera */}
  const pickImageFromCamera = async () => {
    {/*Checking status of permissions*/}
    let result;
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission required", "Camera access is needed.");
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });  
    } catch (error) {
      console.log('An error occured while trying to take a picture.', error);
      return;
    }
    
    

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      const filename = `place_${Date.now()}.jpg`;
      const newPath = FileSystem.documentDirectory + filename;

      try {
        await FileSystem.copyAsync({
          from: uri,
          to: newPath,
        });

        setImage(newPath);
        setFormData({ ...formData, image: newPath });
      } catch (error) {
        console.error("Error copying image:", error);
        Alert.alert("Error", "Could not save image.");
      }
    }
  };

  {/*Function to pick image using local library */}
  const pickImageFromLibrary = async () => {
    {/*Checking status of permissions*/}
    let result;
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission required", "Media Library access is needed.");
        return;
      }  
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });
    } catch (error) {
      console.log('An error occured while trying to access the Media Library.', error);
      return;
    }
    

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      let hallo;
      try {
        // Save image to permanent storage (like default places)
        const filename = `place_${Date.now()}.jpg`;
        const newPath = `${FileSystem.documentDirectory}${filename}`;
        
        await FileSystem.copyAsync({
          from: uri,
          to: newPath,
        });
        
        // Store file path in AsyncStorage (like places.js stores require() paths)
        setImage(newPath);
        setFormData({ ...formData, image: newPath });
      } catch (error) {
        console.error('Error copying image:', error);
        Alert.alert('Error', 'Could not copy image.');
        console.error('Error saving image:', error);
        Alert.alert('Error', 'Could not save image.');
      }
    }
  };

  
  //checking for required fields.
  const handleSubmit = async () => {
    for (const key in requiredFields) {
      if(!formData[key] || formData[key].toString().trim() === ""){
        Alert.alert('Error', requiredFields[key]);
        return;
      }
    }

    try {
      // Send new place to backend API
      await addPlaceApi({
        name: formData.name,
        description: formData.info,
        latitude: formData.lat,
        longitude: formData.lng,
        // image is stored locally on device; backend imageUrl can be null for now
        imageUrl: null,
      });

      Alert.alert('Success!', 'Place has been added successfully', [
        { 
          text: 'OK', 
          onPress: () => {
            router.back();
            // Return to RuheOrte screen
            setTimeout(() => router.push('/ruheorte'), 100);
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Could not add place.');
    }
  };

  const fallbackImage = require('../Images/Places/missingPicture.png');

  return (
    <>
      <StatusBar style ={!isDark ? "dark" : "light"}/>  
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            source={image ? { uri: image } : fallbackImage}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
              style={styles.linearGradient}
            />
            {/*Buttons*/}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={pickImageFromCamera}>
                <Ionicons name="camera" size={40} color={theme.primary}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={pickImageFromLibrary}>
                <Ionicons name="library" size={40} color={theme.primary}  />
              </TouchableOpacity>
              
            </View>
          </ImageBackground>
        </View>
        
        {/* Add Place Button */}      
        <ScrollView style={[styles.form, { backgroundColor: theme.background }]}>
          <Text style={[styles.label, { color: theme.text }]}>Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Name of the Place"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.label, { color: theme.text }]}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
            value={formData.info}
            onChangeText={(text) => setFormData({ ...formData, info: text })}
            placeholder='Description of the Place'
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={4}
          />

        <Text style={[styles.label, { color: theme.text }]}>Category</Text>
        
        <DropDownPicker
          open={open}
          value={formData.category}
          items={items}
          setOpen={setOpen}
          setItems={setItems}
          setValue={(callback) =>
            setFormData({ ...formData, category: callback(formData.category) })
          }
          listMode='SCROLLVIEW' //Without this, we receive an error, because it is used within the ScrollView.
          style={[styles.dropDownClosed, {
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,}]}
          textStyle={{
            color: theme.text,
          }}
          dropDownContainerStyle={[styles.dropDownOpened, {
            backgroundColor: theme.cardBackground,
            borderColor: theme.border}]}

        />
        <View style={styles.coordinatesSection}>
          <Text style={[styles.label, { color: theme.text }]}>Location</Text>
          
          <TouchableOpacity 
            style={[styles.mapButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push({
              pathname: '/map-picker',
              params: { lat: formData.lat, lng: formData.lng }
            })}
          >
            <Ionicons name="map" size={20} color="#fff" />
            <Text style={styles.mapButtonText}>Select on Map</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            
          </View>
        </View>

          <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Place</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { width: '100%', height: '40%' },
  image: { flex: 1, resizeMode: 'cover' },
  linearGradient: { flex: 1 },
  form: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 8, color: '#333' },
  input: {
    marginBottom: 24,
    backgroundColor: '#eef3ef',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  coordinatesSection: {
    marginTop: 16,
    marginBottom: 8,

  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    gap: 8,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  halfInput: {
    width: '48%'
  },
  subLabel: {
    fontSize: 13,
    marginBottom: 6,
  },
  coordInput: {
    marginBottom: 0,
  },
  submitButton: {
    backgroundColor: '#2f6f5f',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    gap: 16, // Abstand zwischen Buttons
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 50,
  },
  dropDownClosed: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  dropDownOpened: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  }

});
