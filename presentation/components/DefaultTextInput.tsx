import {Image, View, TextInput, StyleSheet, KeyboardType, TextInputFocusEventData, NativeSyntheticEvent} from 'react-native'

interface Props{ 
  placeholder: string,
  value: string,
  onChangeText: (text: string) => void,
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  keyboardType?: KeyboardType,
  icon: any,      //Se recibe cualquier tipo de dato
  secureTextEntry?: boolean,    //para contraseñas
  placeholderTextColor?: string
}

/*No podemos usar "require(icon)" causa error por eso se usa icon:any*/

const DefaultTextInput = ({
  placeholder, 
  value, 
  onChangeText,
  onBlur,
  placeholderTextColor, 
  keyboardType, 
  icon,
  secureTextEntry = false     //Opcion A para poner Valores por defecto en caso de que no se seteen al reutilizar el contro

}:Props) => {
  return (
    <View style={styles.containerTextInput}>
          <Image
            style={styles.textInputIcon}
            source={ icon } />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            value = {value}
            placeholderTextColor= {placeholderTextColor || 'white'}
            onChangeText={onChangeText}
            onBlur={onBlur}
            keyboardType={keyboardType || 'default' /*opcion B para poner valores por defecto en propiedades opcionales*/}
            secureTextEntry={secureTextEntry}
          />
        </View>
  )
}

const styles = StyleSheet.create({
  containerTextInput: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    width: '90%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    fontSize: 18
  },
  textInputIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
})

export default DefaultTextInput