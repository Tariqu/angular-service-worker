import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users = [];
  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit() {
    this.todoService.getUsers().subscribe((users: any) => {
      this.users = users;
    });
  }

  gotoUserDetails(id) {
    this.router.navigate([`/users/${id}`]);
  }
}
