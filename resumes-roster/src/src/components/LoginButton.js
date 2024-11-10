import { useGoogleLogin } from '@react-oauth/google';


function LoginButton(){
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
        console.log(tokenResponse)
        console.log('Access Token:', tokenResponse.access_token);
        // Use the access token to make API calls or pass it to your backend
    },
    onError: () => {
        console.error('Login failed');
    },
    scope: 'https://www.googleapis.com/auth/gmail.readonly', // Add additional scopes if needed
});

return (
    <button onClick={() => login()}>
        Login with Google
    </button>
);
}

export default LoginButton;