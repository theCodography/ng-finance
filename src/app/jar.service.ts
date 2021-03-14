import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Jars } from './jars';
import { JARS } from './mock-jars';
@Injectable({
  providedIn: 'root'
})
export class JarService {
  totalMoney = 10000000;
  constructor() { }

  getJars(): Observable<Jars[]>{
    return of(JARS);
  }

  getJar(id: number): Observable<Jars> {
    return of(JARS.find(hero => hero.id === id));
  }
}
