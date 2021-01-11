import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  userDetails;
  postDetails;
  comments;
  isError: boolean = false;
  subscription: Subscription;
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(
      this.route.params.subscribe((params) => {
        this.todoService.getUserById(params.userId).subscribe(
          (result) => {
            this.isError = false;
            this.userDetails = result;
          },
          (error) => {
            this.isError = true;
          }
        );

        this.todoService.getPostById(params.postId).subscribe(
          (result) => {
            this.isError = false;
            this.postDetails = result;
            console.log(this.postDetails);
          },
          (error) => {
            this.isError = true;
          }
        );

        this.todoService.getCommentsByPostId(params.postId).subscribe(
          (result) => {
            this.comments = result;
          },
          (err) => {
            this.isError = true;
          }
        );
      })
    );
  }
}
