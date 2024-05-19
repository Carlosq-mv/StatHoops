import AxiosInstance from '../components/Axios'
import React, { useState } from 'react';
import FormField from '../components/FormField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';


const Login = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    email: '',
    username: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    AxiosInstance.post('/api/login/', formData)
    .then(response => {
      console.log(response.data);
      setFormData({
        password: '',
        email: '',
        username: ''
      });
      setErrorMessage('');
      navigator
    })
    .catch(error => {
      console.log(error.response.data);
      if(error.response.data['missing fields'])
        setErrorMessage('All fields required');

      if(error.response.data.error)
        setErrorMessage(error.response.data.error);
    })
  }


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <h1>Login</h1>
        <div className="col-sm-6 col-md-5 col-lg-6"></div>

        <div className="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0 ">
          
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <FormField id="username" label="Username" value={formData.username} onChange={handleChange} startAdornment={<PersonIcon/>}/>
              </div>

              <div className="mb-3">
                <FormField id="email" label="Email" value={formData.email} onChange={handleChange} startAdornment={<EmailIcon/>}/>
              </div>

              <div className="mb-3">
                <FormField type={showPassword ? 'text' : 'password'} id="password" label="Password" value={formData.password} onChange={handleChange} 
                  startAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }/>
              </div>

              <Button type="submit" variant="outlined">Login</Button>

              <div className="mb-3">
                {errorMessage && <Alert sx={{ m: 1, width: '35ch' }} severity="warning">{errorMessage}</Alert> }
              </div>
          </form>
        </div>

        <div className="text-center">
            Don't Have an Account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  )
}

export default Login