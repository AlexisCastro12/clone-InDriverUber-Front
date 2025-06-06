import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    opacity: 0.6
  },
  form: {
    width: '87%',
    height: '85%',
    position: 'absolute',
    backgroundColor: 'rgba( 255,255,255, 0.2 )',
    borderRadius: 40,
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  imageUser: {
    width: 135,
    height: 135,
    alignSelf: 'center'
  },
  textRegister: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  back: {
    position: 'absolute',
    width: 40,
    height: 35,
    top: 20,
    
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
})

export default styles;