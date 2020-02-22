import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
// import { NgModel } from '@angular/forms';

const routes: Routes = [
    {path: '', component: PerfilUsuarioComponent},
    {path: 'perfil', component: PerfilUsuarioComponent},
    // {path: '**', component: PerfilUsuarioComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
