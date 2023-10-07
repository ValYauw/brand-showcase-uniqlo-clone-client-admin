import useFormInput from '../hooks/useFormInput';
// import { useRegister } from '../hooks/useLoginRegister';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../stores/actions/register';
import { showNotificationSnackbar } from '../stores/actions/snackbar';

import { 
  Button, 
  TextField, Link, Box, Grid, Typography, Container
} from '@mui/material';
import Spinner from '../components/Spinner';

export default function Register() {

  const emailFormProps = useFormInput('');
  const passwordFormProps = useFormInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.register);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(registerNewUser(
        emailFormProps.value,
        passwordFormProps.value
      ));
      dispatch(showNotificationSnackbar({
        type: 'success',
        message: 'New user has been registered. Please let them log in from another machine.'
      }));
      navigate('/');
    } catch(err) {
      dispatch(showNotificationSnackbar({
        type: 'error',
        message: err.message,
      }));
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      
      <Typography component="h1" variant="h5">
        Register New User
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          {...emailFormProps}
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
        />
        <TextField
          {...passwordFormProps}
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          type="password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

      </Box>

      <Spinner open={isLoading} />

    </Box>
  );
}