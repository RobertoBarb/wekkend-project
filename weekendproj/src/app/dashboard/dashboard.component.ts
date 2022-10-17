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
  tokenContractAddress: string;
  tokenTotalSupply: string;
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  etherBalance: string;
  provider: ethers.providers.BaseProvider;

  claimForm = this.fb.group({
    name: [''],
    id: [''],
  })

  constructor(private apiService: ApiService, private fb: FormBuilder) { 
    this.tokenTotalSupply ="Loading...";
    this.walletAddress = 'Loading...';
    this.etherBalance = "Loading...";
    this.tokenContractAddress = "";
    this.provider = ethers.getDefaultProvider("goerli");
  }

  ngOnInit(): void {
    this.apiService.getContractAddress().subscribe((response) => {
      console.log({response});
      this.tokenContractAddress = response.result;
    })
    this.apiService.getTotalSupply().subscribe((response) => {
      this.tokenTotalSupply = response.result;
    })
    const wallet = ethers.Wallet.createRandom();
    this.walletAddress = wallet.address;
    console.log(this.walletAddress);
    this.provider.getBalance(this.walletAddress).then((balanceBN) => {
      this.etherBalance = ethers.utils.formatEther(balanceBN) + "Eth";
    });
  }
  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  request(){
    const body = {
      name: this.claimForm.value.name, 
      id: this.claimForm.value.id}
    this.apiService.requestTokens(body).subscribe((response) => {
      console.log({response});
    })
  }

  castVotes(){
    const body = {
      proposalIndex: 0,
      amount: 1,
    }
    this.apiService.castVotes(body).subscribe((response) => {
      console.log({response});
    })
  }

  delegate(param : any){
    console.log("OOOOOOOOO")
    const body = {
      address: "0x16A7D3d770d3EEB0c5341e5A43F40245DA903eA6",
    }
    console.log(param);
  }
  
  queryVotes(){
    this.apiService.queryResults().subscribe((response) => {
      console.log({response});
    })
  }

  mint(){
    const body = {
      address: "0x004aFB87DBA1C09Cd0F3Db2ECb459E07D2b04a78",
      amount: "1",
    }
    this.apiService.mint(body).subscribe((response) => {
      console.log({response});
    })
  }

}
