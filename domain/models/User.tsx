import { Role } from "react-native";

export interface User {
  id?:                  number; //No se envia el id cuando se registra un usuario porque este se asigna hasta insertarse en la bbdd
  name:                 string;
  lastname:             string;
  email:                string;
  phone:                string;
  password?:            string; //Solo se envia el password la primera vez para guardarla y de ahi ya no regresa en futuras peticiones
  image?:               string;
  notification_token?:  null;
  roles?:               Role[];
}