import { UnauthorizeError } from "@/common/customs";
import { firebaseAuth } from "@/common/firebase.config";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  applyActionCode,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";

export async function login({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  const auth = firebaseAuth;

  return await signInWithEmailAndPassword(auth, username, password);
}

export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  const auth = firebaseAuth;
  return await signInWithPopup(auth, provider);
}

export async function facebookLogin() {
  const provider = new FacebookAuthProvider();
  const auth = firebaseAuth;
  return await signInWithPopup(auth, provider);
}

export async function signUp({
  name,
  email,
  password
}: {
  name: string;
  email: string;
  password: string;
}) {
  const auth = firebaseAuth;

  const result = await createUserWithEmailAndPassword(auth, email, password);

  sendEmailVerification(result.user);

  let retry = 0;

  do {
    try {
      await updateProfile(result.user, {
        displayName: name
      });
      retry = 3;
    } catch (error) {
      retry += 1;
    }
  } while (retry < 3);

  await result.user.reload();

  // For triggering onAuthStateChanged
  await auth.updateCurrentUser(null);

  await auth.updateCurrentUser(result.user);

  return result;
}

export async function signOut() {
  const auth = firebaseAuth;

  if (!auth.currentUser) {
    throw new UnauthorizeError();
  }

  await auth.signOut();
}

export async function verifyEmail({
  code
}: {
  code: string;
}) {
  const auth = firebaseAuth;

  await applyActionCode(auth, code);
}

export async function sendVerifyEmail() {
  const auth = firebaseAuth;

  if (!auth.currentUser) {
    throw new UnauthorizeError();
  }

  sendEmailVerification(auth.currentUser);
}
