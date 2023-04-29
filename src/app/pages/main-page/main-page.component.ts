import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Personaje } from 'src/app/interfaces/Personaje';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  title = 'Users json Place holder!!';
  personajes: Personaje[] | undefined;
  personajesCopy: Personaje[] | undefined;
  searchTerm$ = new Subject<string>();

  constructor(public http: HttpClient) {
    this.getData();
  }

  // ngonInit():void{

  // }

  async getData() {
    await this.http.get<any>(environment.apiUrl).subscribe((res) => {
      this.personajes = res.map(
        ({ id, name, username, email, phone }: Personaje) => {
          return {
            id: id,
            name: name,
            username: username,
            email: email,
            phone: phone,
          };
        }
      );
      // console.table(res);
      this.personajesCopy = this.personajes;
    });
  }

  filter(event: any) {
    const search: string = event.target.value;
    console.log('EV', { search });
    this.personajes = this.personajesCopy?.filter(({ name }: Personaje) => {
      console.log(name.toLowerCase().includes(search.toLowerCase()));
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
