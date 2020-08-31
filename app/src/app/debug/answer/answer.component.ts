import { Component, OnInit } from '@angular/core';
import { AnswerService } from './answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  public answer: String;

  constructor(private service: AnswerService) { }

  ngOnInit(): void {
    this.service.getAnswer().subscribe((answer: String) => {
      this.answer = answer
    })
  }

}
