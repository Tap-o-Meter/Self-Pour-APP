// import AsyncStorage from "@react-native-community/async-storage";

export default {
  retrieveData: async () => {
    // try {
    //   const value = await AsyncStorage.getItem("credentials");
    //   if (value !== null) return JSON.parse(value);
    //   else return null;
    // } catch (error) {
    //   return null;
    // }
  },
  storeData: async credentials => {
    // try {
    //   await AsyncStorage.setItem("credentials", JSON.stringify(credentials));
    // } catch (error) {
    //   console.warn("valió");
    // }
  },
  removeItemValue: async key => {
    // try {
    //   await AsyncStorage.removeItem(key);
    // } catch (exception) {}
  }
};
