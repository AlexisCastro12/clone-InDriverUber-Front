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
  },

  detailsTravelContainer: {
  width: "100%",
  height: "100%",
  },

  modalsTouchableOpacity: {
    opacity: 0.4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },

  modalContent: {
    height: '90%',
    backgroundColor:'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
})

export default styles;