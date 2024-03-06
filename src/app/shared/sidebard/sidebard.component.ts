import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../../client/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styleUrl: './sidebard.component.sass'
})
export class SidebardComponent {
  routesPhone=[
    {
      icon: 'fas fa-home',
      href: '/',
    },
    {
      icon: 'fa-regular fa-compass',
      href: '/explorer',
    }
    ,
    {
      icon: 'fa-solid fa-clapperboard',
      href: '/reels',
    }

  ]

  userIdentify: any= {};

  modalshow : boolean = false;

  routesMain=[
    {
      icon: 'fas fa-home',
      text: 'Home',
      href: '/'
    },
    {
      icon: 'fas fa-search',
      text: 'Search',
      href: '/search'
    },
    {
      icon: 'fa-regular fa-compass',
      text: 'Explorer',
      href: '/explorer'
    },
    {
      icon: 'fa-solid fa-clapperboard',
      text: 'Reels',
      href: '/reels'
    },
    {
      icon: 'fa-regular fa-comments',
      text: 'Messages',
      href: '/messages'
    },
    {
      icon: 'fa-regular fa-bell',
      text: 'Notifications',
      href: '/notifications'
    }
  ];

  constructor(private fb: FormBuilder, private  postService : PostsService , private router: Router) {
    this.userIdentify =  JSON.parse(localStorage.getItem('user')!);

    
    

    this.modalshow = false;
  }


  openModal(){
    this.modalshow = !this.modalshow
  }

  selectedImage: File | null = null;

  selectedImageURL: string | null = null;

  onFileSelect(event: any): void {
      const file = event.target.files[0];
      if (file) {
          this.selectedImage = file;
          this.displaySelectedImage(file);
      }
  }
  
  displaySelectedImage(file: File): void {
      const reader = new FileReader();
      reader.onload = (e) => {
          this.selectedImage = file;
          this.selectedImageURL = e.target?.result as string; // Obtén la URL completa
      };
      reader.readAsDataURL(file);
  }

  postForm = this.fb.group({
    title: ['',[Validators.required, Validators.minLength(3)]],
  })
  

  onSubmit(){
    if (this.postForm.valid && this.selectedImage) {
      const description = this.postForm.get('title')?.value || ''; // Obtén la descripción del formulario
      // aqui deberia cargar la imagen seleccionada pero como un File entonces debo de convertirla

      

      


      this.postService.uploadImage(this.selectedImage, description).subscribe({
        next: (res: any) => {
          this.router.navigate(['/'+this.userIdentify.nick]);
        },
        error: (err: any) => {
          
        }
      })

    }
  }

  disableSubmitButton() {
    const submitButton = document.getElementById('btn_submit');
    if (submitButton) {
      submitButton.setAttribute('disabled', 'true');
    }
  }


}
