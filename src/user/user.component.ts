import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceuserService } from '../serviceuser.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  users: User[] = [];
  userForm!: FormGroup;
  editMode = false;
  currentUserId: number | null = null;
  constructor(private fb: FormBuilder, private service:ServiceuserService) {}

  ngOnInit(): void {
   this.userForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cell: ['', Validators.required],
      password: ['', Validators.required]
    });
 this.loadUsers();
  }

  loadUsers() {
    this.service.getUser().subscribe(data => this.users = data);
  }
   saveUser() {
    const user: User = { userId: this.currentUserId ?? 0, ...this.userForm.value };

    if (this.editMode && this.currentUserId !== null) {
      this.service.updateUser(this.currentUserId, user).subscribe(() => {
        this.loadUsers();
        // this.resetForm();
      });
    } else {
      this.service.addUser(user).subscribe(() => {
        this.loadUsers();
        // this.resetForm();
      });
  }
   }
    editUser(user: User) {
    this.userForm.patchValue(user);
    this.editMode = true;
    this.currentUserId = user.userId;
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe(() => this.loadUsers());
  }
  resetForm() {
    this.userForm.reset();
    this.editMode = false;
    this.currentUserId = null;
  }

  }