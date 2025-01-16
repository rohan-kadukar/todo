import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';  // Import RouterModule

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyCPb-jHCkalnrupO5Epj15k3HodQTM0Ytw",
  authDomain: "todo-app-e8626.firebaseapp.com",
  projectId: "todo-app-e8626",
  storageBucket: "todo-app-e8626.firebasestorage.app",
  messagingSenderId: "519544795117",
  appId: "1:519544795117:web:cbb3b05f6e8ef04776c1e4",
  measurementId: "G-TV63J0EQT4"
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
