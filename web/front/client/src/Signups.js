import React, { Component } from 'react';
import axios from "axios";
import './Signup.css'

class Signups extends Component {
  constructor() {
    super()
    this.state = {
      fullName: '',
      userName: '',
      pass: '',
      email: '',
      contact: ''
    }
    this.changeFullName = this.changeFullName.bind(this)
    this.changeUserName = this.changeUserName.bind(this)
    this.changePass = this.changePass.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changeContact = this.changeContact.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }

  changeFullName(e) {
    this.setState({
      fullName: e.target.value
    })
  }
  changeUserName(e) {
    this.setState({
      userName: e.target.value
    })
  }
  changePass(e) {
    this.setState({
      pass: e.target.value
    })
  }
  changeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  changeContact(e) {
    this.setState({
      contact: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();

    const registered = {
      fullName:this.state.fullName,
      userName:this.state.userName,
      pass:this.state.pass,
      email:this.state.email,
      contact:this.state.contact

    }

    axios.post('http://localhost:4000/app/signup', registered)
    .then(response => console.log(response.data))

    this.setState({
      fullName: '',
      userName: '',
      pass: '',
      email: '',
      contact: ''

    })
  }




  render() {
    return (
      <div>
        <form
          onSubmit={this.onSubmit}
          className="box" >
          <div>
            <h1>User Registration</h1>
          </div>


          <input
            type="text"
            className="input"
            placeholder='Name'
            value={this.state.fullName}
            onChange={this.changeFullName}
          />


          <input
            type="text"
            className="input"
            placeholder='Username'
            value={this.state.userName}
            onChange={this.changeUserName}
          />

          <input
            type="text"
            className="input"
            placeholder='Username'
            value={this.state.pass}
            onChange={this.changePass}
          />

          <input
            type="text"
            className="input"
            placeholder='Email'
            value={this.state.email}
            onChange={this.changeEmail}
          />


          <input
            type="text"
            className="input"
            placeholder='Contact'
            value={this.state.contact}
            onChange={this.changeContact}
          />

          {/* <input
                    type="file"
                    name='file'
                    id='url'
                    className="input"
                    placeholder='Aadhar File'
                    value={userData.file}
                    onChange={postUserData}
                /> */}


          <input type="submit" className='btn'
            value="Submit" />

          {/* <button onClick={submitData} className="btn" type="submit">
                    Submit
                </button> */}
        </form>
      </div>
    )
  }
}

export default Signups