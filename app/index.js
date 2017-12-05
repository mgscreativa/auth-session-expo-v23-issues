import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthSession } from 'expo';

const FACEBOOK_APP_ID = '927948914021535';
const GOOGLE_APP_ID =
  '578038325953-dvfqgjn5at9l4s3513lst639gsqsjgjp.apps.googleusercontent.com';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
    };
  }

  render() {
    if (!this.state.result) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ marginVertical: 30 }}>
            Demo app to showcase AuthSession Issues
          </Text>
          <Button
            title="Open Facebook Auth"
            onPress={this._handleFacebookLogin}
          />
          <Button title="Open Google Auth" onPress={this._handleGoogleLogin} />
        </View>
      );
    }

    return this._renderLoginResult();
  }

  _renderLoginResult = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 12 }}>
          {JSON.stringify(this.state.result)}
        </Text>
      </View>
    );
  };

  _handleFacebookLogin = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FACEBOOK_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    console.log('AuthSession result:', result);

    if (result.type !== 'success') {
      console.log('Result type isn\'t success:', result.type);
    } else if (result.type === 'success' && !result.params) {
      console.log('Result type is success, but there aren\'t params');
    } else if (result.type === 'success' && !result.params.access_token) {
      console.log('Result type is success, but there isn\'t access_token');
    } else {
      console.log('Login seems ok. Access token:', result.params.access_token);
    }

    this.setState({ result });
  };

  _handleGoogleLogin = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.google.com/o/oauth2/auth?response_type=code` +
        `&client_id=${GOOGLE_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&scope=profile%20email`,
    });

    console.log('AuthSession result:', result);

    if (result.type !== 'success') {
      console.log('Result type isn\'t success:', result.type);
    } else if (result.type === 'success' && !result.params) {
      console.log('Result type is success, but there aren\'t params');
    } else if (result.type === 'success' && !result.params.code) {
      console.log('Result type is success, but there isn\'t code');
    } else {
      console.log('Login seems ok. Code:', result.params.code);
    }

    this.setState({ result });
  };
}

export default App;
