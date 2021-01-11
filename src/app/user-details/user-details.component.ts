import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userDetails;
  posts;
  isError: boolean = false;
  subscription: Subscription;
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(
      this.route.params.subscribe((params) => {
        this.todoService.getUserById(params.id).subscribe(
          (result) => {
            this.isError = false;
            this.userDetails = result;
          },
          (error) => {
            this.isError = true;
          }
        );
        this.todoService.getPostsUserId(params.id).subscribe(
          (result) => {
            this.posts = result;
          },
          (err) => {
            this.isError = true;
          }
        );
      })
    );
  }

  postDetails(postId: number): void {
    this.router.navigate([`/post-detail/${this.userDetails.id}/${postId}`]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
