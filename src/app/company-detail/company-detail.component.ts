import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Company } from '../models/company';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { FormGenerator } from '../form-generator/form-generator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  @Input() company: Company;
  public submitEmitter = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location) { }

  ngOnInit() {
    this.getCompany();
  }

  getCompany(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) { return; }
    this.dataService.getObject(Company, +id).subscribe(result => {
      this.company = result.object;
    });
  }

  goBack(): void {
      // this.location.back();
  }

  save(): void {
    this.submitEmitter.emit();
    this.dataService.putObject(this.company).subscribe(() => this.goBack());
  }

}
