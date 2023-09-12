import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import botImg from '../assets/defaultProfile.jpg'
import './Signup.css'




function Signup() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  function validateImg(e){
    const file = e.target.files[0]; //to access image
    if(file.size >= 1048576){   //greater than 1mb
      return alert("Upload image less than 1MB")
    }
    else{
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage(){
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'oskeaqfg');

    try{
      //hosting image on Cloudinary
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/dr5zvzdie/image/upload",{
        method : 'post',
        body : data
      })

      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url

    }
    catch(error){
      setUploadingImg(false);
      console.log(error)
    }
  }


  async function handleSignup(e){
    e.preventDefault();

    if(!image){
      return alert("Please upload your profile picture");
    }
    const url = await uploadImage(image);
    // const url = uploadImage(image);
    console.log(url);
  }


  return (
    <Container>
      <Row>
        <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>

            <h1 className='text-center'>Create Account</h1>

            <div className='signup-profile-pic__container'>
              <img src={imagePreview || botImg} alt="..loading" className='signup-profile-pic'/>
              <label htmlFor="image-upload" className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
              </label>
              {/* <div>
                <input type="file" id="image-upload" hidden accept='image/png, image/jpeg' onChange={validateImg}/>
              </div> */}
              
               <input type="file" id="image-upload" hidden accept='image/png, image/jpeg' onChange={validateImg}/>
            </div>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </Form.Group>

            <Button variant="primary" type="submit">
              {uploadingImg ? "Signing you up.." : "Create Account"}
              {/* Create Account */}
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Already have an account ? <Link to="/Login">Login</Link>
                </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className='signup__bg'></Col>
      </Row>
    </Container>
  )
}

export default Signup
