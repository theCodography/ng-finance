import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Jars } from './models/jars';

const defaultJars: Jars[] = [
  { id: 1, title: 'Necessities', percentage: 50, income: 0, expense: 0 },
  { id: 2, title: 'Education', percentage: 10, income: 0, expense: 0 },
  { id: 3, title: 'Saving', percentage: 15, income: 0, expense: 0 },
  { id: 4, title: 'Play', percentage: 15, income: 0, expense: 0 },
  { id: 5, title: 'Investment', percentage: 5, income: 0, expense: 0 },
  { id: 6, title: 'Give', percentage: 5, income: 0, expense: 0 },
];
@Injectable({
  providedIn: 'root',
})
export class JarService {
  private static readonly JarStorageKey = 'jars';
  private jars: Jars[];

  totalMoney = 10000000;
  constructor(private storageService: LocalStorageService) {}
  fetchFromLocalStorage() {
    this.jars =
      this.storageService.getValue<Jars[]>(JarService.JarStorageKey) ||
      defaultJars;
  }

  updateToLocalStorage() {
    this.storageService.setObject(JarService.JarStorageKey, this.jars);
  }
  getJars(): Jars[] {
    return this.jars;
  }

  getJar(id: number): Jars {
    return this.jars.find((jar) => jar.id === id);
  }
}
