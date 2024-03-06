import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PostsService } from '../services/posts.service';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.sass'
})
export class PostsComponent {


  show: boolean=false;



  comment: string='';


  status: any=[
  ];

  comments: any=[
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
  ];

  postModal: any={
    charged: "Cargando ...",
  };


  posts=[{
    charged: "Cargando ...",
  }];

  fechaModal: any;

  userIdentify: any;

  environmento: any;

  statusleft: boolean=false;

  statusright: boolean=true;

  page: number=0;

  constructor(private postsService: PostsService, private fb: FormBuilder, private usersService: UsersService, private router: Router) {
    this.environmento=environment;
    
    const routes = this.router.config;
    console.log('routes : ',routes);
    this.postsService.getPosts().subscribe(
      (res: any) => {
        this.posts=res;
      }
    )
    this.loadObjetos();

    

    this.show=false;

    this.statusleft=false;

    this.firstPage=0;

  }
 
  loadedPages: number[]=[];

  finalPage : number = 99; // unknown pages , change with !
  firstPage : number = 0;

  enrollfinalPage : boolean = false;
  enrollfirstPage : boolean = false;

  loadObjetos() {
    
    if (!this.loadedPages.includes(this.page)) {
      this.usersService.getAllUsers(this.page).subscribe(
        (data) => {

          const users = data.users;
            this.status.push(...users);
            this.loadedPages.push(this.page);
            console.log(this.status);
            console.log('loaded : ',this.loadedPages,'page : ',this.page);
            this.moveCarousel();
            if (data.finalPage) {
              this.finalPage = data.page - 1;
              this.enrollfinalPage = true;
              if (this.enrollfinalPage) {
                this.statusright=false;
                this.statusleft=true;
              }
            } 
            if (data.firstPage) {
              this.firstPage = data.page - 1;
              this.enrollfirstPage = true;
              if (this.enrollfirstPage) {
                this.statusleft=false;
                this.statusright=true;
              }
            }
          
          
        }
      );
    } else{
      this.moveCarousel();
    }
  }

  buttonright(): void {
    this.statusright=false;
    if (this.page<this.finalPage) {
      this.page= this.page+1;
      this.loadObjetos();
      
      if (this.page==this.finalPage && this.enrollfinalPage) {
        this.statusright=false;
        this.statusleft=true;
      } else{
        this.statusleft=true;
      }
    }
    
  }



  buttonleft(): void {
    this.statusleft=false;
    if (this.page>=0) {
      
      this.page= this.page-1;
      this.loadObjetos();

      if (this.page==this.firstPage && this.enrollfirstPage) {
        this.statusleft=false;
        this.statusright=true;
        
      } else{
        this.statusright=true;
      }
      
    }
    

    

    

  }

  moveCarousel() {
    const translateX=-this.page*555; // Ancho del contenedor
    const carouselElement=document.querySelector('.carousel') as HTMLElement;
    carouselElement.style.transform=`translateX(${translateX}px)`;
  }

  like(id: any): void {
    console.log('like in posts', id)
    this.postsService.like(id).subscribe(
      (res: any) => {
        this.posts.map((post: any) => {
          if (post.id==id) {
            post.likedByCurrentUser=true
            post.likesCount=post.likesCount+1
          }
        })
      }
    )
  }

  dislike(id: any): void {
    this.postsService.dislike(id).subscribe(
      (res: any) => {
        this.posts.map((post: any) => {
          if (post.id==id) {
            post.likedByCurrentUser=false
            post.likesCount=post.likesCount-1
          }
        })
      }
    )
  }


  openModal(id: any): void {
    console.log(id)
    if (this.show) {
      this.show=false;
      document.body.classList.remove('no-scroll');
      this.postModal={
        charged: "Cargando ...",
      }
    } else {
      this.postsService.getPost(id).subscribe(
        (res: any) => {
          this.postModal=res;
          this.fechaModal=this.postsService.formatDate(this.postModal.created_at);
          document.body.classList.add('no-scroll');
          this.show=true;
        }

      )

    }
  }

  commentPost(id: any, content: any): void {
    console.log(' on posts :', id, content)
    this.postsService.commentPost(id, content).subscribe(
      (res: any) => {
        this.posts.map((post: any) => {
          if (post.id==id) {
            post.commentsCount=post.commentsCount+1
            if (post.comment==undefined) {
              post.comment={};

            }
            post.comment=res;

            if (!(this.postModal.charged=="Cargando ...")) {

              this.postModal.comments.push(res)

            }

          }
        })
      }
    )

  }







}


