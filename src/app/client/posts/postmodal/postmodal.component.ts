import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { environment } from '../../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.component.html',
  styleUrl: './postmodal.component.sass'
})
export class PostmodalComponent {

  @Input() postModal : any = {
    
  }

  commentForm  = this.fb.group({
    comment: ['', [Validators.required, Validators.minLength(3)]]
  })

  @Input() fechaModal : any

  @Output() toggleModalEvent = new EventEmitter<void>();
  
  @Output() toggleLikeEvent = new EventEmitter<void>();

  @Output() toggleDislikeEvent = new EventEmitter<void>();

  @Output() toggleCommentEvent = new EventEmitter<{ id: any ; content: string}>();


  environmento : any;

  constructor(public postsService: PostsService, private fb: FormBuilder) {
    this.environmento = environment;
  }


  closeModal(id : any) {
    this.toggleModalEvent.emit(id);
  }

  like(id : any) {
    this.toggleLikeEvent.emit(id);
    this.postModal.likedByCurrentUser = true
    this.postModal.likesCount = this.postModal.likesCount + 1
  }

  dislike(id : any) {
    this.toggleDislikeEvent.emit(id);
    this.postModal.likedByCurrentUser = false
    this.postModal.likesCount = this.postModal.likesCount - 1
  }



  onSubmit() {

    if (this.commentForm.invalid) {
      console.log('invalid')
    } else {
      this.toggleCommentEvent.emit({ id: this.postModal.id, content: ''+this.commentForm.value.comment});
      this.commentForm.reset();
    }
    
  }

  
  

}
