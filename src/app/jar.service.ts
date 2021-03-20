import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Histories } from './models/histories';
import { Jars } from './models/jars';

const defaultJars: Jars[] = [
  { id: 1, title: 'Necessities', percentage: 50, income: 0, expense: 0 },
  { id: 2, title: 'Education', percentage: 10, income: 0, expense: 0 },
  { id: 3, title: 'Saving', percentage: 15, income: 0, expense: 0 },
  { id: 4, title: 'Play', percentage: 15, income: 0, expense: 0 },
  { id: 5, title: 'Investment', percentage: 5, income: 0, expense: 0 },
  { id: 6, title: 'Give', percentage: 5, income: 0, expense: 0 },
];
const defaultHistories: Histories[] = [];
const defaultWallet = {
  income: 0,
  expense: 0,
};
@Injectable({
  providedIn: 'root',
})
export class JarService {
  private static readonly JarStorageKey = 'jars';
  private static readonly WalletStorageKey = 'wallet';
  private static readonly HistoryKey = 'history';
  private walletExpenseSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private walletIncomeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private jars: Jars[];
  private histories: Histories[];
  private wallet;
  walletExpense$: Observable<number> = this.walletExpenseSubject.asObservable();
  walletIncome$: Observable<number> = this.walletIncomeSubject.asObservable();
  constructor(private storageService: LocalStorageService) {}
  fetchFromLocalStorage() {
    this.jars =
      this.storageService.getValue<Jars[]>(JarService.JarStorageKey) ||
      defaultJars;
    this.wallet =
      this.storageService.getValue<number>(JarService.WalletStorageKey) ||
      defaultWallet;
    this.histories =
      this.storageService.getValue<Histories[]>(JarService.HistoryKey) ||
      defaultHistories;
  }
  updateWallet() {
    this.walletExpenseSubject.next(
      this.jars.reduce((acc, jar) => {
        return acc + Number(jar.expense);
      }, 0)
    );
    this.walletExpense$.subscribe((money) => {
      this.wallet.expense = money;
    });
    this.walletIncomeSubject.next(
      this.jars.reduce((acc, jar) => {
        return acc + Number(jar.income);
      }, 0)
    );
    this.walletIncome$.subscribe((money) => {
      this.wallet.income = money;
    });
  }
  updateToLocalStorage() {
    this.storageService.setObject(JarService.JarStorageKey, this.jars);
    this.updateWallet();
    this.storageService.setObject(JarService.WalletStorageKey, this.wallet);
  }
  updateHistoryToLocalStorage() {
    this.storageService.setObject(JarService.HistoryKey, this.histories);
  }
  addHistory(amount: number, jar: Jars[], description?: string, type: string = 'expense') {
    const id = new Date(Date.now()).getTime();
    const newHistory: Histories = new Histories(
      id,
      type,
      jar,
      amount,
      new Date(Date.now()),
      description
    );
    this.histories.push(newHistory);
    this.updateHistoryToLocalStorage();
  }
  getJars(): Jars[] {
    return this.jars;
  }

  getJar(id: number): Jars {
    return this.jars.find((jar) => jar.id === id);
  }

  getWallet() {
    return this.wallet;
  }
}
