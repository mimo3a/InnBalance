import { api } from './apiClient';

export function getMyPlaces() {
  return api.get('/places/my');
}

export function addPlace(place) {
  return api.post('/places', {
    name: place.name,
    description: place.description,
    latitude: place.latitude,
    longitude: place.longitude,
    category: place.category ?? null,
    imageUrl: place.imageUrl ?? null,
  });
}

export function updatePlace(id, update) {
  return api.put(`/places/${id}`, update);
}

export function deletePlace(id) {
  return api.delete(`/places/${id}`);
}

// Upload a place image file and get back a public URL from backend
export async function uploadPlaceImage(fileUri) {
  const formData = new FormData();

  formData.append('file', {
    uri: fileUri,
    name: `place_${Date.now()}.jpg`,
    type: 'image/jpeg',
  });

  // Assumes backend exposes POST /files/upload that returns { url: '...' }
  return api.upload('/files/upload', formData);
}
