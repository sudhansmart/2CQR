import React,{useState} from 'react'
import '../styles/loginform.css'
import {Form, Button, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
function LoginForm() {
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.username === 'admin' && formData.password === 'admin') {
             navigate('/data');
            
        } else {
            alert('Invalid username or password. Please try again.');
        console.log(formData);
    }}
  return (
    <div className='loginform'>
            <h2>Login</h2>
             <Form className='w-75' onSubmit={handleSubmit}  >
               
                <Form.Group  className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" required name='username' onChange={onChange} value={formData.username} />   
                </Form.Group>
               
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required  name='password' onChange={onChange} value={formData.password}/>
                </Form.Group>
                <button className='submit-btn' type="submit">Login</button>
            </Form>
    </div>
  )
}

export default LoginForm;