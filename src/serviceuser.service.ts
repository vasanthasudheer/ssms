import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceuserService {
private apiUrl = 'https://localhost:7202/api/UserList';

  constructor(private http:HttpClient) { }
  getUser():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl)
  }
  addUser(user:User):Observable<User[]>{
    return this.http.post<User[]>(this.apiUrl,user)
  }
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
