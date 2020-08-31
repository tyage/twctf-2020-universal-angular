import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  public query: String
  public answer = '42'

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q']
    })

    // TODO: fetch answer via API
    /*
    this.service.getAnswer().subscribe((answer: String) => {
      this.answer = answer
    })
    */
  }

}
