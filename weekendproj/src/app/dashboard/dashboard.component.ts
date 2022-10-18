import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  wallet: ethers.Wallet | undefined;
  provider: ethers.providers.BaseProvider;
  apiResponse: string;

  claimForm = this.fb.group({
    name: [''],
    id: [''],
  })

  voteForm = this.fb.group({
    proposal: [''],
    amount: 0
  })

  mintForm = this.fb.group({
    address: [''],
    amount: 0
  })

  delegateForm = this.fb.group({
    address: [''],
  })

  constructor(private apiService: ApiService, private fb: FormBuilder) { 
    this.apiResponse = "Loading ...";
    this.provider = ethers.getDefaultProvider("goerli");
  }

  ngOnInit(): void {
    const wallet = ethers.Wallet.createRandom();
  }
  displayStyle = "none";

  formPopup(id : string){
    const el = document.getElementById(id);
    if (el != null ) {
      if (el.style.display === 'none') {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }
  }

  castVotes(){
    const body = {
      proposal: this.voteForm.value.proposal, 
      amount: this.voteForm.value.amount?.toString()
    }
    this.apiService.castVotes(body).subscribe((response) => {
      console.log({response});
      this.apiResponse = response.toString();
    })
  }

  delegate(){
    const body = {
      name: this.delegateForm.value.address, 
    }
    this.apiService.delegate(body).subscribe((response) => {
      console.log({response});
      this.apiResponse = response.toString();
    })
  }
  
  queryVotes(){
    this.apiService.queryResults().subscribe((response) => {
      console.log({response});
      this.apiResponse = response.toString();
    })
  }

  mint(){
    const body = {
      address: this.mintForm.value.address, 
      amount: this.mintForm.value.amount?.toString()
    }
    this.apiService.mint(body).subscribe((response) => {
      console.log({response});
      this.apiResponse = response.toString();
    })
  }

}
