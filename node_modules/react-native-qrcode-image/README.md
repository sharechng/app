# react-native-qrcode-image
A react-native component to generate [QRcode](http://en.wikipedia.org/wiki/QR_code), using only images (no Webview needed)

## Installation
```sh
npm install react-native-qrcode-image --save
```
## Usage
```jsx
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-image';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';

class HelloWorld extends Component {
  state = {
    text: 'http://facebook.github.io/react-native/',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        <QRCode
          value={this.state.text}
          size={200}
          bgColor='#FFFFFF'
          fgColor='#000000'/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);

module.exports = HelloWorld;
```
## Available Props

prop      | type                               | default value
----------|------------------------------------|--------------
`value`   | `string`                           | `http://facebook.github.io/react-native/`
`size`    | `number`                           | `128`
`bgColor` | `string` (CSS color in hex format) | `'#000000'`
`fgColor` | `string` (CSS color in hex format) | `'#FFFFFF'`

<img src='qrcode.png' height = '256' width = '256'/>

# Licenses

All source code is licensed under the [MIT License](https://github.com/dvdbng/react-native-qrcode-image/blob/master/LICENSE).
