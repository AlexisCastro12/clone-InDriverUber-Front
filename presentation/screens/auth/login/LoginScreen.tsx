import { Text, View, Image } from "react-native";
import DefaultRoundedButton from "../../../components/DefaultRoundedButton";
import DefaultTextInput from "../../../components/DefaultTextInput";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";
import styles from "./Styles";
import { Formik } from "formik";
import { container } from "../../../../di/container";
import { LoginViewModel } from "./LoginViewModel";
import { useAuth } from "../../../hooks/useAuth";
import { AuthResponse } from "../../../../domain/models/AuthResponse";
import { ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { useEffect } from "react";

interface Props extends StackScreenProps<RootStackParamList, "LoginScreen"> {}

const LoginScreen = ({ navigation, route }: Props) => {
  let RegExpEmail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; //We use the RFC 5322 compliant regex to validate the email
  const validations = (values: { email: string; password: string }) => {
    //Aqui termina la definicion de la Arrow Function pero se colocan en lista los atributos de values por si se desean agregar mas
    //OBJETO QUE ALMACENA LOS POSIBLES ERRORES EN EL FORMULARIO
    const errors: {
      email?: string;
      password?: string;
    } = {};
    //VALIDACION EMAIL
    if (!values.email) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!RegExpEmail.test(values.email)) {
      errors.email = "Ingrese un correo electrónico válido";
    }
    //VALIDACION PASSWORD
    if (!values.password) {
      errors.password = "la contraseña es obligatoria";
    } //Create the error to psw field (empty field)
    else if (values.password.length < 6)
      errors.password = "La contraseña debe tener al menos 6 caracteres"; //Create the error to password length
    return errors;
  };

  // Aplicando Clean Architecture + MVVM + Dependency Injection
  const loginViewModel: LoginViewModel = container.resolve("loginViewModel");

  // Usando contexto para manejar datos de autenticacion
  const { authResponse, saveAuthSession } = useAuth();

  // Despues de renderizar la pantalla de login evaluamos el estado de authResponse, 
  // si aun no existe autenticacion (!authResponse) entonces no se redirige (no hace nada - fuera bloque if), 
  // si ya hay datos precargados entonces realiza un redireccionamiento de pantallas:
  // seleccion de roles (si hay mas de uno) o a la pantalla de cliente (solo uno)
  // ademas, si cambia (loggeo): NULL ---> info de autenticacion entonces redirige a otras pantallas tambien 
  useEffect(() => {
    if (authResponse) {
      if (authResponse.user.roles!.length > 1) {
        navigation.navigate("RolesScreen");
      } else {
        navigation.navigate("ClientHomeScreen");
      }
    }
  }, [authResponse]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/city.jpg")}
      />
      <View style={styles.form}>
        <Image
          source={require("../../../../assets/user.png")}
          style={styles.imageUser}
        />
        <Text style={styles.textLogin}>LOGIN</Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={validations}
          onSubmit={async (values) => {
            //Se envia el correo en formato limpio (todo en minusculas y sin espacios al principio y al final)
            const response: AuthResponse | ErrorResponse =
              await loginViewModel.login(
                values.email.trim().toLowerCase(),
                values.password
              );
            if ("token" in response) {
              // LOGIN EXITOSO
              saveAuthSession(response);
              console.log("LOGIN EXITOSO Y ALMACENADO LOCALMENTE");
            }
            console.log("RESPONSE:\n", response);
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
                icon={require("../../../../assets/email.png")}
                placeholder="Correo Electronico"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
              />
              {errors.email && touched.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              <DefaultTextInput
                icon={require("../../../../assets/password.png")}
                placeholder="Contraseña"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry={true}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}

              <DefaultRoundedButton
                text="INICIAR SESION"
                onPress={handleSubmit}
              />

              <View style={styles.containerTextDontHaveAccount}>
                <View style={styles.divider}></View>
                <Text style={styles.textDontHaveAccount}>
                  ¿No tienes una cuenta?
                </Text>
                <View style={styles.divider}></View>
              </View>

              <DefaultRoundedButton
                text="REGISTRATE"
                onPress={() => {
                  navigation.navigate("RegisterScreen");
                }}
                backgroundColor="black"
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default LoginScreen;
