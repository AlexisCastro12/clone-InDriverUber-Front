import { Role } from "react-native";

export interface User {
  id?:                 number;  //No se envia el id cuando se registra un usuario por primera vez
  name:                string;
  lastname:            string;
  email:               string;
  phone:               string;
  image?:              string;
  notification_token?: null;
  roles:               Role[];
}