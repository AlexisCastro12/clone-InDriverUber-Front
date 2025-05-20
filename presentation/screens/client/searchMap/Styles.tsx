import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width:'100%',
    height: '100%',
  },

  placeAutocomplete: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },

  clearButton: {
    paddingHorizontal: 10,
    position: 'absolute',
    right: 5,
    top: 7,
    zIndex: 2,
    backgroundColor: 'white',
  },
  
  clearText: {
    fontSize: 22,
    color: '#888'
  }
})

export default styles;