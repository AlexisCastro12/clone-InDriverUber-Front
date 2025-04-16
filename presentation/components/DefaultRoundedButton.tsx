//COMPONENTES REUTILIZABLES
import { StyleSheet, Pressable, Text } from "react-native"

//usamos interface props porque estamos usando TS
interface Props {
  text: string,
  onPress: () => void,
  //el simbolo ? permite que esta propiedad sea opcional al pasarla
  backgroundColor?: string
}

const DefaultRoundedButton = ({ text, onPress, backgroundColor }: Props) => {
  return (
    <Pressable style={[styles.roundedButton, {backgroundColor: backgroundColor || 'red'}]}
      onPress={onPress}>
      <Text style={styles.textButton}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  roundedButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 25,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default DefaultRoundedButton