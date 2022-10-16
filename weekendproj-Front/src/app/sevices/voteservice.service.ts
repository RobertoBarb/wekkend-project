import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteserviceService {

  constructor(http: HttpClientModule) { }


  vote() {
    //TO-DO HERE
  }

  delegate() {
    //TO-DO HERE

  }

  mint() {
    //TO-DO HERE
  }

  getVoteResult() {
    //TO-DO HERE
  }

  getRecentVotes() {
    //TO-DO HERE
  }
}
