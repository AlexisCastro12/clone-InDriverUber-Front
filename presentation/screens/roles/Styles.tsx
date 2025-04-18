import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 5,
    marginTop: 15,
  },

  textItem: {
    alignSelf: 'center',
    fontSize: 22,
  },

  flatListContent: {
    flexGrow: 1, 
    justifyContent: 'center' 
  }
})

export default styles;