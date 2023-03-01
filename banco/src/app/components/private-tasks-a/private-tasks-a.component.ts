import { Component } from '@angular/core';
import { AuthAService } from 'src/app/services/authA.service';

@Component({
  selector: 'app-private-tasks-a',
  templateUrl: './private-tasks-a.component.html',
  styleUrls: ['./private-tasks-a.component.css']
})
export class PrivateTasksAComponent {
  constructor(
    public authAService: AuthAService
  ){}
}
