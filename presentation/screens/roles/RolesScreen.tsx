import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/MainStackNavigator";
import { FlatList, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Styles";
import RolesItem from "./RolesItem";


interface Props extends StackScreenProps<RootStackParamList, 'RolesScreen'>{};

export default function RolesScreen({navigation, route}: Props) {
  const { authResponse } = useAuth();
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle = {styles.flatListContent}
          data={authResponse?.user.roles}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <RolesItem role={item} navigation={navigation}/>}
        />
      </View>
    )
}