import { View, Button, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles.js';
import Utility from '../utilities/UtilityFunctions.js'
import { useEffect, useState } from "react";
import {WebView} from 'react-native-webview';


export default function Login(props){
    const baseUrl = 'https://accounts.spotify.com/authorize?';

    const [webViewSource, setWebViewSource] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleLoginPress(){
        setIsLoading(true);
    }

    useEffect(() => {
        console.log(window.location.href);
        if(isLoading){
            let state = Utility.generateRandomString(16);
            let codeVerifier = Utility.generateRandomString(20);
            const storeItems = async () =>{
                try{
                    await AsyncStorage.setItem('state', state);
                    console.log('state:' + state);
                    await AsyncStorage.setItem('codeVerifier', codeVerifier);
                    console.log('codeVerifier:'+ codeVerifier);
                }
                catch(err){
                    console.log(err);
                }
            };

            storeItems();

            let codeChallenge = (Utility.generateCodeChallenge(codeVerifier));
            let args = new URLSearchParams({
                response_type: 'code',
                client_id: props.clientId,
                redirect_uri: 'http://localhost:19006',
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });
    
            let uri = baseUrl + args.toString();
            console.log(uri);
            setWebViewSource(uri);
        }
    }, [isLoading])

    return (
      <View style={styles.center}>
        {webViewSource ? (
          <WebView source={webViewSource}></WebView>
        ) : (
          <Button
            title={isLoading ? "Loading..." : "Login to Spotify"}
            style={styles.loginButton}
            onPress={() => handleLoginPress()}
            disabled={!isLoading.toString()}
          ></Button>
        )}
      </View>
    );
}
