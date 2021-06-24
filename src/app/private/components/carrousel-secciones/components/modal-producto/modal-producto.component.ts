import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {
  @Input() producto:any;
  validateForm!: FormGroup;
  isVisible = false;
  isConfirmLoading = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.producto);
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();} 
 }

 buildForm(){
  this.validateForm = this.fb.group({
    userName: [null, [Validators.required]],
    password: [null, [Validators.required]],
    remember: [true]
  });
 }

}
