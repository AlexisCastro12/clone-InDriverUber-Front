import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    opacity: 0.7
  },
  form: {
    position: 'absolute',
    width: '85%',
    height: '75%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 35,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  imageUser: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 15
  },
  textLogin: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  containerTextDontHaveAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20
  }
  ,
  textDontHaveAccount: {
    color: 'white',
    fontSize: 16,
  },
  divider: {
    height: 1,
    width: '18%',
    backgroundColor: 'white',
    marginHorizontal: 5,
  }
  ,
  errorText: {
    color: 'red',
    fontSize: 16,
  }

});

export default styles;