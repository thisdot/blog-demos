/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { getStateFromPath, LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  NotFound: undefined;
  Tree: { branch: string; path: string[] };
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    initialRouteName: "Home",
    screens: {
      Home: "",
      Profile: "profile",
      Tree: "tree/:branch/:path",
    },
  },
  getStateFromPath: (path, options) => {
    let state = getStateFromPath(path, options);

    // If the state is undefined, we want to handle the path ourselves to the right screen, by updating the state and returning it.
    if (!state) {
      // check if route contains the main id of the screen we want to show
      const hasTree = path.includes('tree');
       if (hasTree) {
        const [,, branch, ...rest] = path.split('/');

        state = {
          routes: [
            { 
              path,
              name: 'Tree', 
              params: { 
                branch, 
                path: rest.join('/'), // here our path is the rest of the path after the branch
              } 
            }
          ],
        };
      };
    }

    return state;
  },
};

export default linking;
