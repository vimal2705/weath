import React from 'react'
import { Text,TextInput } from "react-native"
import store from './src/store'
import {Provider} from 'react-redux'
import { enableScreens } from 'react-native-screens';
import Root from './Root'

const App = () => {
    enableScreens(false)
    if (Text.defaultProps == null) {
        Text.defaultProps = {};
        Text.defaultProps.allowFontScaling = false;
    }
    
    if (TextInput.defaultProps == null) {
        TextInput.defaultProps = {};
        TextInput.defaultProps.allowFontScaling = false;
    }
    return(
        <Provider store={store}>
            <Root/>
        </Provider>
    )
}

export default App
