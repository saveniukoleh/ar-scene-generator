import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

const SignIn = (props: {firebaseApp: any, auth: any}) => {
    const signInWithGoogle = () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const signOutFromAR = () => {
        const auth = getAuth()
        signOut(auth);
        console.log(auth)
    }

    return (
        <>
        <button className="btn btn-primary" onClick={signInWithGoogle}>
            Увійти
        </button>
        <button className="btn btn-primary" style={{marginLeft:"12px"}} onClick={signOutFromAR}>
            Вийти
        </button>
        </>
    )
}

export default SignIn;