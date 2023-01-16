import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import Navigation from '../../Navigation/Navigations';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./EmployeeLogin.css"



const theme = createTheme();


export default function EmployeeLogin() {

  const [emailId, setEmailId] = useState(" ") 
  const [password, setPassword] = useState("")
  const [backdata, setBackData] = useState([])
  const navigate = useNavigate();


  const emailChange = (event) => {
    setEmailId(event.target.value)
  }

  const passChange = (event) => {
    setPassword(event.target.value)
  }


  // function submitButton(event){
  //   event.preventDefault();
  //  let emailBackData = backdata.find((e) => { 
  //   //  console.log(e.emailId)
  //   //  console.log(emailId)

  // }
  //  )
  //   console.log(emailBackData)
  // }

  let submitButton = (event) => {
    event.preventDefault();
    backdata.map((ele) => {
        if(ele.emailId == emailId && ele.password == password){
            alert("Login Successful!")
            navigate("/employee-module")
            // Session management 
            // const userLogged = localStorage.getItem("userLogged");
            localStorage.setItem("LoginData", JSON.stringify(ele));
        }else if(ele.emailId != emailId && ele.password == password){
          alert("Invalid EmailId! ")
        }else if(ele.emailId == emailId && ele.password != password){
          alert("Invalid Password! ")
        }else if(emailId == "" && password == ""){
          alert("Sundram The Lover Boy! ")
        }
    })
  }

  useEffect(()=> {
    axios.get("http://localhost:8085/employees").then((response) => {
      setBackData(response.data);
    })
  }, [])


  return (
    <>
    <Navigation />  
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{backgroundColor: "#AE275F"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Employee Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={emailChange}
              value={emailId}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              onChange={passChange}
              value={password}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="btnlogin"
              style={{backgroundColor: "#AE275F"}}
              onClick={submitButton}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              halfWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              id="btnlogin"
              style={{backgroundColor: "#AE275F"}}
              onClick={() => {
                navigate("/")
              }}
            >
               <ArrowBackIosNewTwoToneIcon/> Home
            </Button>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    <footer className='copyrightfooter'> 
    <p> Copyright &#169; By Axis Batch 9 </p>
    </footer>
    </>
  );
}

