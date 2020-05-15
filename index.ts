import { AppRegistry } from "react-native";
import { Main } from "./src/scenes";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => Main);
