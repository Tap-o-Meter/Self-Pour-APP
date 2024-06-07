import { Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { Component } from "react";

export const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
