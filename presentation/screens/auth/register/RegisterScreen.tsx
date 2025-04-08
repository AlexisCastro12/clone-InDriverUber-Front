import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import styles from "./Styles";
import DefaultTextInput from "../../../components/DefaultTextInput";
import DefaultRoundedButton from "../../../components/DefaultRoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";

interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> { };

const RegisterScreen = ({ navigation, route }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
      style={{flex:1}}
    >
      <ScrollView contentContainerStyle={{flexGrow:1}}
        keyboardShouldPersistTaps='handled'
      >
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/city.jpg')}
          style={styles.imageBackground}
        />
        <View style={styles.form}>
          <Pressable
            onPress={() => navigation.pop()}
            hitSlop={30}
          >
            <Image
              style={styles.back}
              source={require('../../../../assets/left_arrow.png')}
            />
          </Pressable>
          <Image
            source={require('../../../../assets/user.png')}
            style={styles.imageUser}
          />
          <Text style={styles.textRegister}>REGISTRO</Text>
          <DefaultTextInput
            placeholder="Nombre"
            value=""
            onChangeText={text => { }}
            icon={require('../../../../assets/user.png')}
          />
          <DefaultTextInput
            placeholder="Apellido"
            value=""
            onChangeText={text => { }}
            icon={require('../../../../assets/user_image.png')}
          />
          <DefaultTextInput
            placeholder="Correo Electrónico"
            value=""
            onChangeText={text => { }}
            keyboardType="email-address"
            icon={require('../../../../assets/email.png')}
          />
          <DefaultTextInput
            placeholder="Teléfono"
            value=""
            onChangeText={text => { }}
            keyboardType="numeric"
            icon={require('../../../../assets/phone.png')}
          />
          <DefaultTextInput
            placeholder="Contraseña"
            value=""
            onChangeText={text => { }}
            icon={require('../../../../assets/password.png')}
            secureTextEntry={true}
          />
          <DefaultTextInput
            placeholder="Confirmar Contraseña"
            value=""
            onChangeText={text => { }}
            icon={require('../../../../assets/password.png')}
            secureTextEntry={true}
          />

          <DefaultRoundedButton
            text="REGISTRARSE"
            backgroundColor="black"
            onPress={() => { }}
          />
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen;