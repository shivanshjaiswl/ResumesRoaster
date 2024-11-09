import { GoogleLogin } from '@react-oauth/google';


function LoginButton(){
 const handleLoginSuccess = (credentialResponse) => {
    console.log('Access Token:', credentialResponse);
    // Here, you can send the token to your backend for verification or use it for further logic
  };

  const handleLoginFailure = () => {
    console.error('Login failed');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        scope="https://www.googleapis.com/auth/gmail.readonly"
      />
    </div>
  );
}

export default LoginButton;