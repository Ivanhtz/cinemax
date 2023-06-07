import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userStatus'
})

//Pipe para saber si el usuario está activo o inactivo, utilizando el método transform.
export class UserStatusPipe implements PipeTransform {
    transform(active: boolean): string {
        return active ? 'Activo' : 'Inactivo';
    }
}
