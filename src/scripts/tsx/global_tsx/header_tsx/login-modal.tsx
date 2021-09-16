import * as React from 'react';
import { useState, useContext } from 'react';
import {auth, googleAuthProvider, facebookAuthProvider} from "../firebase_setup";
import {GlobalContext} from "../context";

interface ModalStateProps {
    modalState: ("login" | "signup"),
    setModalState: React.Dispatch<React.SetStateAction<"login" | "signup">>
}

interface ErrorMessageProps {
    errorMessage: {
        visible: Boolean,
        code: string
    },
    setErrorMessage: React.Dispatch<React.SetStateAction<{
        visible: Boolean,
        code: string
    }>>
}

interface LoginModalProps {
    setModalVisibility: React.Dispatch<React.SetStateAction<Boolean>>
}

const LoginModal: React.FC<LoginModalProps> = ({setModalVisibility}) => {
    const [modalState, setModalState] = useState<ModalStateProps["modalState"]>("login");
    const [errorMessage, setErrorMessage] = useState<ErrorMessageProps["errorMessage"]>({visible: false, code: ""});

    const context = useContext(GlobalContext);

    const modalStateHandler: () => void = () => {
        if (modalState === "login") {
            setModalState("signup")
        } else {
            setModalState("login")
        }
    }

    const handleUserSuccess: (email: string, name: string) => void = (email: string, name: string) => {
        window.localStorage.setItem("appAuth-email", email);
        window.localStorage.setItem("appAuth-name", name);
        context.setEmail(email);
        context.setStatus(true);
        context.setName(name)
        setErrorMessage({visible: false, code: ""});
        setModalVisibility(false);
    }

    const emailPasswordAuthenticationHandler: () => void = async () => {
        const emailField = document.getElementById("login-form_email")!;
        const passwordField = document.getElementById("login-form_password")!;
        if (modalState === "signup") {
            try {
                const newMember= await auth.createUserWithEmailAndPassword((emailField as HTMLInputElement).value, (passwordField as HTMLInputElement).value);
                if (newMember.user && newMember.user.email) {
                        handleUserSuccess(newMember.user.email, newMember.user.email.split("@")[0])
                }
            } catch (err) {
                setErrorMessage({visible: true, code: "" + err})
            }
        } else {
            try {
            const loggedInMember = await auth.signInWithEmailAndPassword((emailField as HTMLInputElement).value, (passwordField as HTMLInputElement).value);
            if (loggedInMember.user && loggedInMember.user.email) 
                handleUserSuccess(loggedInMember.user.email, loggedInMember.user.email.split("@")[0])            
            } catch(err) {
                setErrorMessage({visible: true, code: "" + err});
            }
        }
    }

    const handleLoginClick: (provider: string) => void = async (provider) => {
        if (provider === "google") {
            try{
                const googleLogin = await auth.signInWithPopup(googleAuthProvider);
                if (googleLogin.user && googleLogin.user.email && googleLogin.user.displayName) {
                    handleUserSuccess(googleLogin.user.email, googleLogin.user.displayName)
                }
            } catch (err) {
                setErrorMessage({visible: true, code: "Error here: " + err});
            }
        } else {
            try{
                const fbLogin = await auth.signInWithPopup(facebookAuthProvider);
                if (fbLogin.user && fbLogin.user.email && fbLogin.user.displayName) {
                    handleUserSuccess(fbLogin.user.email, fbLogin.user.displayName)
                }
            } catch (err) {
                setErrorMessage({visible: true, code: "Error here: " + err});
            }
        }
    }

    return (
        <div className="login-modal_wrapper">
            <div className="login-modal_container">
            <h1 className="login-modal_title" onClick={modalStateHandler}>{modalState === "login" ? "Click here to Sign Up" : "Click here to Log In"}</h1>
                <input type="email" className="login-form_email" id="login-form_email" onInput={(e) => setErrorMessage({visible: false, code: ""})}/>
                <input type="password" className="login-form_password" id="login-form_password"  onInput={(e) => setErrorMessage({visible: false, code: ""})}/>
                {errorMessage.visible ? <h5 className="login-modal_error-message" style={{color: "red"}}>{errorMessage.code}</h5>: null}
                <button className="login-form_submit-btn" onClick={emailPasswordAuthenticationHandler}>Submit</button>
                <hr style={{width: "300px", color: "rgba(109, 109, 109, 0.322)", margin: "30px 0"}}/>
                <div className="login-modal_oauth_container">
                <button className="login-form_google-login" type="button" onClick={() => handleLoginClick("google")}>
                    {modalState==="login"? "Login with Google" : "Sign Up with Google"}
                </button>
                <button className="login-form_facebook-login" type="button" onClick={() => handleLoginClick("facebook")}>
                    {modalState==="login"? "Login with Facebook" : "Sign Up with Facebook"}
                </button>
                </div>
                <button className="login-modal_close-btn" onClick={() => setModalVisibility(false)}>&times;</button>
            </div>
        </div>
    )
}

export default LoginModal