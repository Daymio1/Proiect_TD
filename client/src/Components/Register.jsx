import {useState, useEffect} from "react";
import axios from "../api/axios";
import {Alert, Form, Row} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";


const REGISTER_URL = '/register';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [validated, setValidated] = useState(false);



    /* Sterge erroarea in momentul in care user/pwd sunt modificate */
    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, pwd, username, pwdConfirm]);


    /* Apeleaza API-ul cu datele din form */
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);

        console.log(firstName, lastName, username, pwd, email, pwdConfirm);


        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({firstName, lastName, email, pwd, username}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: false
                }
            );

            setUsername('');
            setPwd('');
            setEmail('');
            setFirstName('');
            setLastName('');
            setPwdConfirm('');
            navigate('/login');
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Register Failed');
            }
        }
    }

    const renderErrorMessage = () => {
        return (
            <Alert variant="danger">
                <p>{errMsg}</p>
            </Alert>
        )
    }

    const renderRegisterForm = () => {
        return (

            <Form onSubmit={handleRegisterSubmit} validated={validated}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="labelLogin">Email</Form.Label>
                    <Form.Control
                        required
                        class="form-control form-control-sm"
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label className="labelLogin">First Name</Form.Label>
                    <Form.Control
                        required
                        class="form-control form-control-sm"
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label className="labelLogin">Last Name</Form.Label>
                    <Form.Control
                        required
                        class="form-control form-control-sm"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label className="labelLogin">Username</Form.Label>
                    <Form.Control
                        required
                        class="form-control form-control-sm"
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="labelLogin">Password</Form.Label>
                    <Form.Control
                        required
                        class="form-control form-control-sm"
                        type="password"
                        placeholder="Password"
                        aria-autocomplete={'none'}
                        autoComplete="off"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="labelLogin">Confirm Password</Form.Label>
                    <Form.Control
                        required
                        class="form-control form-control-sm"
                        type="password"
                        placeholder="Confirm Password"
                        aria-autocomplete={'none'}
                        autoComplete="off"
                        onChange={(e) => setPwdConfirm(e.target.value)}
                        value={pwdConfirm}/>
                </Form.Group>

                <div className="btnLogInPosition">
                    <button className="buttonLogin">Sign Up</button>
                </div>
                <div className="textLink" style={{textAlign: "center"}}>
                    Already have an account? <Link to="/login" className="link"> Log in</Link>
                </div>
            </Form>
        )
    }
    return (
        (success ? <>
                    <h1>LOGIN </h1>
                </>
                :
                <>
                    <div className="rectangleLogin p-4">
                        <Row><img className="logoLoginRectangle"/></Row>
                        <Row>
                            {renderRegisterForm()}
                        </Row>
                        <Row className='paddingErrorMsg'>
                            {errMsg ? renderErrorMessage() : ''}
                        </Row>
                    </div>
                </>
        )

    )
}

export default Register;