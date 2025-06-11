import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  AnimatedViewMap: {
    width: "100%",
    position: "absolute",
    top: 0,
  },

  placeOriginAutocomplete: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 2,
  },

  placeDestinationAutocomplete: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    zIndex: 1,
  },

  textInputAutocomplete: {
    textAlign: 'left',
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingRight: 38,
  },

  clearAutocompleteButton: {
    paddingHorizontal: 10,
    position: 'absolute',
    right: 5,
    top: 7,
    zIndex: 2,
    backgroundColor: 'white',
  },
  
  clearAutocompleteText: {
    fontSize: 22,
    color: '#888'
  },

  timeAndDistanceView: {
    width: '100%',
    height: 60,
    backgroundColor: 'yellow'
  }
})

export default styles;