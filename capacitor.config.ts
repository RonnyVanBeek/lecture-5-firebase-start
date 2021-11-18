import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'be.thomasmore.graduaten.chat',
  appName: 'Les 5 Chat',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FirebaseAuthentication: {
      skipNativeAuth:false,
      providers:['phone','google.com']
    }
  }
};

export default config;
