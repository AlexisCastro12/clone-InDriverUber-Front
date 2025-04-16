import AsyncStorage from "@react-native-async-storage/async-storage";

export class LocalStorage {
  async save(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error al guardar datos en LocalStorage: ', error);
    }
  }

  async getItem(key: string) {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (error) {
      console.error('Error al obtener información de LocalStorage: ', error);
    }
  }

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar datos en LocalStorage: ', error);
    }
  }
}