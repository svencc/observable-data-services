import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {User} from '../shared/model/user';
import {Http, Headers, Response} from '@angular/http';
import {catchError, first, map, tap} from 'rxjs/operators';

export const UNKNOWN_USER: User = {
  firstName: 'UNKNOWN',
  lastName: 'UNKNOWN'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(UNKNOWN_USER);
  user$: Observable<User> = this.userSubject.asObservable();

  constructor(private http: Http) {
  }

  login(email: string, password: string): Observable<User> {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/login', {email, password}, {headers: headers})
      .pipe(
        map<Response, User>((response: Response) => {
          if (response && response.status === 200) {
            return response.json() as User;
          } else {
            return UNKNOWN_USER;
          }
        }),
        tap(user => {
          if (user !== UNKNOWN_USER) {
            this.userSubject.next(user);
          } else {
            throwError('No login');
          }
        }),
        // catchError( () => throwError('No login') ),
        catchError( () => throwError('No login') ),
        first()
    )
  }
}
