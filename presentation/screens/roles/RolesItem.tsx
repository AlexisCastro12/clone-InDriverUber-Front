import { Image, Pressable, Text, View } from "react-native";
import { Role } from "../../../domain/models/Role";
import styles from "./Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/MainStackNavigator";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "RolesScreen", undefined>;
  role: Role;
}

export default function RolesItem({ navigation, role }: Props) {
  return (
    <Pressable 
    onPress={() => {
      if(role.id == 'ADMIN'){
        navigation.replace('AdminHomeScreen');
      }
      else if(role.id == 'CLIENT'){
        navigation.replace('ClientHomeScreen');
      }
      else if(role.id == 'DRIVER')
      {
        navigation.replace('DriverHomeScreen');
      }
    }} 
    hitSlop={5}>
      <View>
        <Image style={styles.image} source={{ uri: role.image }} />
        <Text style={styles.textItem}>{role.name}</Text>
      </View>
    </Pressable>
  );
}
