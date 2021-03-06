import {Injectable} from '@angular/core';
import {FirebaseAuthentication} from '@robingenz/capacitor-firebase-authentication';
import {Router} from '@angular/router';
import {Auth, signInWithCredential, signOut} from '@angular/fire/auth';
import {updateProfile, GoogleAuthProvider, PhoneAuthProvider, User} from 'firebase/auth';
import {Capacitor} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: null | User = null;
  private verificationId: string;

  constructor(public auth: Auth, public router: Router) {
    this.auth.onAuthStateChanged(user => this.setCurrentUser(user));
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getProfilePic(): string {
    return this.currentUser && this.currentUser.photoURL ? this.currentUser.photoURL : '/assets/Portrait_Placeholder.png';
  }

  getDisplayName(): string | undefined {
    return this.currentUser ? this.currentUser.displayName : undefined;
  }

  getEmail(): string | undefined {
    return this.currentUser ? this.currentUser.email : undefined;
  }

  getUserUID(): string | undefined {
    return this.currentUser ? this.currentUser.uid : undefined;
  }

  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }

  async signInWithGoogle(): Promise<void> {
    const {credential: {idToken, accessToken}} = await FirebaseAuthentication.signInWithGoogle();

    if (Capacitor.isNativePlatform()){
      const credential = GoogleAuthProvider.credential(idToken,accessToken);
      signInWithCredential(this.auth, credential);
    }
  }


  async sendPhoneVerificationCode(phoneNumber: string): Promise<void> {
    const {verificationId} = await FirebaseAuthentication.signInWithPhoneNumber({phoneNumber});
    this.verificationId = verificationId;
  }

  async signInWithPhoneNumber(verificationCode: string): Promise<void> {
    // await FirebaseAuthentication.signInWithPhoneNumber({
    //   verificationId: this.verificationId,
    //   verificationCode,
    // });
    if (Capacitor.isNativePlatform){
      const credential = PhoneAuthProvider.credential(this.verificationId, verificationCode)
      signInWithCredential(this.auth, credential);
    }
  };

  async updateDisplayName(displayName: string) {
    await updateProfile(this.auth.currentUser, {
      displayName
    });
  }

  /**
   * Save the new user as an instance variable, and perform any necessary reroutes.
   *
   * @param user The new user.
   * @private
   */
  private async setCurrentUser(user: User): Promise<void> {
    this.currentUser = user;
    if (this.currentUser) {
      await this.router.navigate(['/']);
    } else {
      await this.router.navigate(['/login']);
    }
  }
}
