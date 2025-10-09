import { Routes } from '@angular/router';
// Importando os componentes
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component'; // Supondo que você tenha criado o componente de login

// Definindo as rotas do aplicativo
export const routes: Routes = [
    // Rota principal (login)
    { path: '', component: LoginComponent },
    
    // Rota para o login
    { path: 'login', component: LoginComponent },

    // Rota (home)
    { path: 'home', component: HomeComponent },
    
    // Caso a rota não seja encontrada, redireciona para a home
    { path: '**', redirectTo: '' }
];
