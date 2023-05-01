import { View, Text, TextInput } from "react-native";
import { SHA256 } from "crypto-js";
import { useEffect, useState } from "react";
import styles from '../styles/styles.js';
import UtilityFunctions from '../utilities/UtilityFunctions.js'

export default function Login(){
    const [hash, setHash] = useState(null);
    const [base64Hash, setBase64Hash] = useState(null);

    function handleTextChange(val){
        setHash(SHA256(val).toString())
        let b64 = UtilityFunctions.base64encode(hash);
        console.log(b64);
        setBase64Hash(b64);
    }
    return(
        <View style={styles.center}>
            <TextInput onChangeText={(val) => handleTextChange(val)} placeholder="Enter text to encode"></TextInput>
            <Text>Result: {hash}</Text>
            <Text>Base64: {base64Hash}</Text>
        </View>
    )
}
