import { Component, Input, OnInit } from '@angular/core';
import { GitHubService } from '../github.service';
import { Observable } from 'rxjs';

interface User {
  bio: string;
  name: string;
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() counter = 0;
  name: string;
  error: string;

  increment() {
    this.counter += 1;
  }
  decrement() {
    this.counter -= 1;
  }

  constructor(private gh: GitHubService) {}

  ngOnInit(): void {
    this.gh.getUser('sutin1234').subscribe(
      (data: User) => {
        this.name = data?.name;
      },
      (err: any) => {
        this.error = 'server error';
      }
    );
  }
}
