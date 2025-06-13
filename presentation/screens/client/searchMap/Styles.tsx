import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  AnimatedViewMap: {
    width: "100%",
    position: "absolute",
    top: 0,
  },

  placeOriginAutocomplete: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 2,
  },

  placeDestinationAutocomplete: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 10,
    zIndex: 1,
  },

  textInputAutocomplete: {
    textAlign: "left",
    textAlignVertical: "center",
    includeFontPadding: false,
    paddingRight: 38,
  },

  clearAutocompleteButton: {
    paddingHorizontal: 10,
    position: "absolute",
    right: 5,
    top: 7,
    zIndex: 2,
    backgroundColor: "white",
  },

  clearAutocompleteText: {
    fontSize: 22,
    color: "#888",
  },

  timeAndDistanceView: {
    width: "100%",
    height: 60,
    backgroundColor: "#EA4C4C",
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 20
  },

  timeAndDistanceText: {
    color: 'white',
    fontSize: 15,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    height: "90%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  viewDecorationModal: {
    backgroundColor: "black",
    width: "100%",
    height: 50,
    justifyContent:'center',
    paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  textDecorationModal: {
    color: "white",
    fontSize: 18,
  },

  animatedViewDetailsTravel: {
    width: "100%",
    position: "absolute",
    height: "30%",
    bottom: 0,
    backgroundColor: "white",
    padding: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  infoAutocompleteContainer: {
    backgroundColor: 'rgb(240,240,240)',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  }
});

export default styles;
