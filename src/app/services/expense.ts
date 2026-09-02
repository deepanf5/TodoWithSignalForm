import { inject, Injectable, Injector } from '@angular/core';
import { expenseI } from '../expense/add-expense/add-expense';
import { Auth } from './auth';
import { supabase } from '../app.config';
import { defer, filter, finalize, from, Observable, of, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ExpenseI } from '../expense/expense-tracker/expense-tracker';
import { Loader } from './loader';

@Injectable({
  providedIn: 'root',
})
export class Expense {
  authS = inject(Auth);
  id = this.authS.userId;
  private injector = inject(Injector);
  private loaderS = inject(Loader);

  addExpense(formData: expenseI): Observable<any> {
    return from(
      supabase.from('expense').insert([
        {
          user_id: this.authS.userId() || null,
          category: formData.category,
          description: formData.description,
          amount: formData.amount,
        },
      ]),
    );
  }

  getExpenseList(): Observable<any> {
    return toObservable(this.authS.userId, { injector: this.injector }).pipe(
      filter((userId) => !!userId),
      switchMap(() => {
        // 1. Check signal value correctly with parentheses ()
        if (!this.authS.userId()) {
          return of([]);
        }

        // 2. Wrap the Supabase request inside defer & pipe finalize
        return defer(() => {
          this.loaderS.show();
          return from(
            supabase
              .from('expense')
              .select('*')
              .eq('user_id', this.authS.userId())
              .order('created_at', { ascending: false }),
          );
        }).pipe(
          finalize(() => this.loaderS.hide()), // Turn off loader on completion or error
        );
      }),
    );
  }

  removeExpenseById(id: number): Observable<any> {
    return from(supabase.from('expense').delete().eq('id', id).select());
  }

  getThisMonthExpense(): Observable<any> {
    if (!this.authS.userId()) {
      return of({ data: [], error: null });
    }
    const now = new Date();

    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

    return from(
      supabase
        .from('expense')
        .select('*')
        .eq('user_id', this.authS.userId())
        .gte('created_at', firstDayOfMonth)
        .lt('created_at', firstDayOfNextMonth)
        .order('created_at', { ascending: false }),
    );
  }
}
