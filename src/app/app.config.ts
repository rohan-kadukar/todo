import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';  // Import RouterModule

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "6",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    importProvidersFrom(RouterModule)  // Ensure RouterModule is imported here
  ]
};
