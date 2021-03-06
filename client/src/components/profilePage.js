import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import './profilePage.css';
import NavbarForSite from './navbar';
import Footer from './footer';


class ProfilePage extends Component{

    constructor(props) {
        super(props);

        this.state = { userName: null, userEmail: '', userImage: '', numberField: '', show: false, msg: '', otp: '',
                     verify: '', loggedIn: true}
    }

    onTextChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    verifyNumberFunction = () => {

        if(this.state.numberField === '') {
            alert('please enter your mobile number')
        }else{
            axios.get(`${process.env.REACT_APP_BACKEND_API}/phoneNo/${this.state.numberField}`)
            .then(res => {
                //console.log(res);
                this.setState({show: !this.state.show,
                              msg: res.data.message})
                this.showOTPEnterModal();
                //alert(res.data.message)

            })

            //this.setState({show: !this.state.show})
            //this.showOTPEnterModal();

        }

    }

    onSubmit = () => {
        this.setState({show: !this.state.show})

        axios.get(`${process.env.REACT_APP_BACKEND_API}/verify?phoneNo=${this.state.numberField}&code=${this.state.otp}&userId=${this.props.user._id}`)
            .then(res => {
                //console.log(res)
                alert(res.data.message)
                this.setState({
                    verify: <i className="fas fa-check-circle"></i>
                })
            })

    }

    showOTPEnterModal = () => {

        return (
            <React.Fragment>
                <Modal
                    show = {this.state.show}
                    backdrop="static"
                    keyboard={true}
                >
                <Modal.Header >
                    <Modal.Title>Enter OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.msg}
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            OTP
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="number" value={this.state.otp} name='otp' onChange={this.onTextChanged} placeholder="OTP" min="1"/>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onSubmit}>
                        Submit
                    </Button>

                </Modal.Footer>
                </Modal>
            </React.Fragment>
        )

}


    componentDidUpdate(prevProps, prevState) {
        try{
            if(!prevState.userName) {
                if(this.props.user.userPhoneNo[0]){
                this.setState({userName: this.props.user.userName,
                              userEmail: this.props.user.userEmail,
                              userImage: this.props.user.userImage,
                              numberField: this.props.user.userPhoneNo[0].value,
                              verify: <i className="fas fa-check-circle"></i>})
                } else {
                    this.setState({userName: this.props.user.userName,
                              userEmail: this.props.user.userEmail,
                              userImage: this.props.user.userImage})
                }
            }
        } catch(err) {
            this.setState({loggedIn: false})
        }
    }

    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/' />;
        }

        return (
            <div className="parent-div">
                <NavbarForSite />

                {this.showOTPEnterModal()}

                <div className="profile-info">
                    <img className="profile-image" alt="profile" src={this.state.userImage}/>
                    <hr className="profile-divider" />
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Label className="email-container">
                                    {this.state.userEmail}
                                </Form.Label>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Phone Number {this.state.verify}
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control className="phno-container" type="number" value={this.state.numberField} name='numberField' onChange={this.onTextChanged} placeholder="Enter Phone Number without 0 or +91" />
                            </Col>
                            <Button className="verify-btn" onClick={this.verifyNumberFunction}> Verify Number </Button>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Package type
                            </Form.Label>
                            <Form.Label column sm="10">
                                Free Trial
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Validity
                            </Form.Label>
                            <Form.Label column sm="10">
                                31st August
                            </Form.Label>
                        </Form.Group>
                    </Form>
                </div>

                <div id="footer">
                    <Footer />
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(ProfilePage);
