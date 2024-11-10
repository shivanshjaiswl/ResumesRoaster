import { useGoogleLogin } from '@react-oauth/google';



function LoginButton(){
    const sendToken = async (token) => {
        try {
          const response = await fetch('https://rnftc-2620-cc-8000-1c83-b514-5f33-49fd-39f7.a.free.pinggy.link//token_id', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log('Success:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
        sendToken(tokenResponse.access_token)
        console.log('Access Token:', tokenResponse.access_token);
        // Use the access token to make API calls or pass it to your backend
    },
    onError: () => {
        console.error('Login failed');
    },
    scope: 'https://www.googleapis.com/auth/gmail.readonly', // Add additional scopes if needed
});

return (
    <button  style={{
      padding: '10px 20px',
      fontSize: '14px',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      fontFamily: 'Raleway, sans-serif',
      marginRight: '20px',
      marginLeft: '135px'
    }} onClick={() => login()}>
        Login with Google
    </button>
);
}

export default LoginButton;