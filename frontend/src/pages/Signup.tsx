import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import AxiosInstance from '../components/Axios';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import FormField from '../components/FormField'
import { Link } from 'react-router-dom';

const Signup = () => {
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
    AxiosInstance.post('/api/create-account/', formData)
    .then(response => {
      console.log(response.data);
      setFormData({
        password: '',
        email: '',
        username: ''
      });
      setErrorMessage('');
      
    })
    .catch(error => {
      console.log(error.response.data);
      if(error.response.data['missing fields'])
        setErrorMessage('All fields required');

      if(error.response.data.error)
        setErrorMessage(error.response.data.error);
    });
  }
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div className=" position-absolute top-50 start-50 translate-middle shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <h1>Create Account</h1>
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

              <Button type="submit" variant="outlined">Signup</Button>

              <div className="mb-3">
                {errorMessage && <Alert sx={{ m: 1, width: '35ch' }} severity="warning">{errorMessage}</Alert> }
              </div>
          </form>
        </div>

        <div>
            Login Here <Link to="/login">Login</Link>
        </div>

      </div>
    </>
  )
}

export default Signup