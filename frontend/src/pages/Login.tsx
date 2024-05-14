import AxiosInstance from '../components/Axios'
import { useState, useEffect } from 'react';
const Login = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
  AxiosInstance.get('/api/login/')
    .then(response => {
      setMessage(response.data.message)
    })
    .catch(error => {
      console.log(error)
    })
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

export default Login