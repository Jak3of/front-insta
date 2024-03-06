import { Component, OnInit } from '@angular/core';
import {environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent implements OnInit {

  environmento : any;

  user : any = {
    
  }
  show : boolean = false;

  showModal : boolean = false;

  userIdentify : any = {
    
  };

  nick : string  = '';

  posts : any = [{},{},{},{},{}]

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private usersService : UsersService,
    private postsService : PostsService
  ) {
    this.environmento = environment;
    this.show = false;

    
  }

  ngOnInit(){
    this.show = false;
    this.route.params.subscribe( params => {
      this.nick = params['nick'];
      console.log('nick',this.nick);
      let exists = false;
      this.usersService.userExists(this.nick).subscribe(
        (res : any) => {
          console.log('exists',res.exists);
          exists = res.exists;
          if (exists){
            this.usersService.getUsers(this.nick).subscribe(
              (res : any) => {
                this.user = res;
                console.log('user',res);

                this.usersService.getPostsforUser(this.user.id).subscribe(
                  (res : any) => {
                    this.posts = res;
                    this.show = true;
                  }
                )

              }
            )
            
          } else {
            this.router.navigate(['/notfound']);
          }
        }
      );
      
    })

    



  }



  fechaModal : any;

  postModal : any;



  like(id : any) : void {
    console.log('like in posts', id)
    this.postsService.like(id).subscribe(
      (res: any) => {
        this.posts.map((post: any) => {
          if (post.id == id) {
            post.likedByCurrentUser = true
            post.likesCount = post.likesCount + 1
          }
        })
      }
    )
  }

  dislike(id : any) : void {
    this.postsService.dislike(id).subscribe(
      (res: any) => {
        this.posts.map((post: any) => {
          if (post.id == id) {
            post.likedByCurrentUser = false
            post.likesCount = post.likesCount - 1
          }
        })
      }
    )
  }


  openModal(id: any) : void {
    console.log(id)
    if (this.showModal) {
      this.showModal = false;
      document.body.classList.remove('no-scroll');
      this.postModal = {
        charged: "Cargando ...",
      }
    } else {
      this.postsService.getPost(id).subscribe(
        (res: any) => {
          this.postModal = res;
          this.fechaModal = this.postsService.formatDate(this.postModal.created_at);
          document.body.classList.add('no-scroll');
          this.showModal = true;
        }

      )

    }
  }

  commentPost(id : any, content : any) : void {
    console.log(' on posts :',id, content)
    this.postsService.commentPost(id, content).subscribe(
      (res: any) => {
        this.posts.map((post: any) => {
          if (post.id == id) {
            post.commentsCount = post.commentsCount + 1
            if (post.comment == undefined) {
              post.comment = {};
              
            } 
            post.comment = res;
            
            if (!(this.postModal.charged == "Cargando ...")) {
              
              this.postModal.comments.push(res)
              
            }
              
          }
        })
      }
    )

  }

}
