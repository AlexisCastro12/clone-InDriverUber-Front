import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import styles from "./Styles";
import DefaultTextInput from "../../../components/DefaultTextInput";
import DefaultRoundedButton from "../../../components/DefaultRoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";
import { Formik } from "formik";
import { container } from "../../../../di/container";
import { RegisterViewModel } from "./RegisterViewModel";

interface Props
  extends StackScreenProps<RootStackParamList, "RegisterScreen"> {}

const RegisterScreen = ({ navigation, route }: Props) => {
  let RegExpEmail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; //We use the RFC 5322 compliant regex to validate the email
  let RegExpNameLN = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
  let RegExpPhone = /^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/; //formatos posibles (541) -753-6010, 541-753-6010, 541753-6010 o 541753-6010.
  const validations = (values: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    //OBJETO QUE ALMACENA LOS POSIBLES ERRORES EN EL FORMULARIO
    const errors: {
      name?: string;
      lastname?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    //VALIDACION NAME
    if (!values.name) {
      errors.name = "El nombre es obligatorio";
    } else if (!RegExpNameLN.test(values.name)) {
      errors.name = "El nombre no debe tener numeros ni caracteres especiales";
    }
    //VALIDACION LASTNAME
    if (!values.lastname) {
      errors.lastname = "El apellido es obligatorio";
    } else if (!RegExpNameLN.test(values.lastname)) {
      errors.lastname =
        "El apellido no debe tener numeros ni caracteres especiales";
    }
    //VALIDACION EMAIL
    if (!values.email) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!RegExpEmail.test(values.email)) {
      errors.email = "Ingrese un correo electrónico válido";
    }
    //VALIDACION PHONE
    if (!values.phone) {
      errors.phone = "El telefono es obligatorio";
    } else if (!RegExpPhone.test(values.phone)) {
      if (values.phone.replace(/\D/g, "").length !== 10)
        errors.phone = "El número telefonico debe tener 10 digitos";
      else
        errors.phone =
          "El numero telefonico no tiene un formato válido\n(1234567890, 123 456 7890, 123-456-7890, 123.456.7890)";
    }
    //VALIDACION PASSWORD
    if (!values.password) {
      errors.password = "la contraseña es obligatoria";
    } else if (values.password.length < 6)
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    //VALIDACION CONFIRMPASSWORD
    if (!values.confirmPassword) {
      errors.confirmPassword = "Es necesario confirmar la contraseña";
    } else if (values.password !== values.confirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden";
    return errors;
  };

  const registerViewModel: RegisterViewModel =
    container.resolve("registerViewModel");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image
            source={require("../../../../assets/city.jpg")}
            style={styles.imageBackground}
          />
          <View style={styles.form}>
            <Pressable onPress={() => navigation.pop()} hitSlop={30}>
              <Image
                style={styles.back}
                source={require("../../../../assets/left_arrow.png")}
              />
            </Pressable>
            <Image
              source={require("../../../../assets/user.png")}
              style={styles.imageUser}
            />
            <Text style={styles.textRegister}>REGISTRO</Text>
            <Formik
              initialValues={{
                name: "",
                lastname: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
              }}
              validate={validations}
              onSubmit={async (values) => {
                // CONEXION A BACKEND CON CA, DI y MVVM
                // const response = await loginViewModel.login(values.email.trim().toLowerCase(), values.password);
                // En login se enviaron 2 variables (var1,var2) porque asi se definio el metodo, en register se envia un objeto ({obj})
                const response = await registerViewModel.register({
                  name: values.name.trim(),
                  lastname: values.lastname.trim(),
                  email: values.email.toLowerCase(),
                  // Estandarizamos los numeros a 1234567890
                  phone: values.phone.replace(/\D/g, ""),
                  password: values.password,
                  // No se agrega rol porque en backend se crea por defecto
                  // Si se crean screens diferentes para login de usuario/cliente y usuario/conductor ahi si se envian dependiendo de la screen
                });
                console.log("PROCESO DE REGISTRO TERMINADO");
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <DefaultTextInput
                    placeholder="Nombre"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    icon={require("../../../../assets/user.png")}
                  />
                  {errors.name && touched.name ? (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  ) : null}

                  <DefaultTextInput
                    placeholder="Apellido"
                    value={values.lastname}
                    onChangeText={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                    icon={require("../../../../assets/user_image.png")}
                  />
                  {errors.lastname && touched.lastname ? (
                    <Text style={styles.errorText}>{errors.lastname}</Text>
                  ) : null}

                  <DefaultTextInput
                    placeholder="Correo Electrónico"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    icon={require("../../../../assets/email.png")}
                  />
                  {errors.email && touched.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}

                  <DefaultTextInput
                    placeholder="Teléfono"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    keyboardType="numeric"
                    icon={require("../../../../assets/phone.png")}
                  />
                  {errors.phone && touched.phone ? (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  ) : null}

                  <DefaultTextInput
                    placeholder="Contraseña"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    icon={require("../../../../assets/password.png")}
                    secureTextEntry={true}
                  />
                  {errors.password && touched.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : null}

                  <DefaultTextInput
                    placeholder="Confirmar Contraseña"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    icon={require("../../../../assets/password.png")}
                    secureTextEntry={true}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  ) : null}

                  <DefaultRoundedButton
                    text="REGISTRARSE"
                    backgroundColor="black"
                    onPress={() => {
                      handleSubmit();
                      //Podemos redirigir a otra pagina para mejorar la UX
                      //navigation.navigate('LoginScreen');
                    }}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
