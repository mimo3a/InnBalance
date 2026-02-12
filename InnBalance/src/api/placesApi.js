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
    imageUrl: place.imageUrl ?? null,
  });
}

export function updatePlace(id, update) {
  return api.put(`/places/${id}`, update);
}

export function deletePlace(id) {
  return api.delete(`/places/${id}`);
}
