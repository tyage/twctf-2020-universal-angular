import { Component, OnInit } from '@angular/core';
import { FlagService } from './flag.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {
  public flag:String;

  constructor(private service: FlagService) { }

  ngOnInit(): void {
    this.service.getAnswer().subscribe((flag: String) => {
      this.flag = flag
    })
  }

}
