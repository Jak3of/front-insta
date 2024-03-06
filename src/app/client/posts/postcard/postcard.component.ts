import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PostsService } from '../../services/posts.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-postcard',

  templateUrl: './postcard.component.html',
  styleUrl: './postcard.component.sass'
})
export class PostcardComponent implements AfterViewInit {
  

  @Input() post: any = {
    
  };

  commentForm  = this.fb.group({
    comment: ['', [Validators.required, Validators.minLength(3)]]
  })
  
  fecha: any ;
  
  @Output() toggleModalEvent = new EventEmitter<void>();
  @Output() toggleLikeEvent = new EventEmitter<void>();
  @Output() toggleDislikeEvent = new EventEmitter<void>();
  @Output() toggleCommentEvent = new EventEmitter<{ id: any ; content: string}>();

  

environmento: any;
  constructor( public postsService: PostsService, private fb: FormBuilder) {
    this.environmento = environment;
    
    
  }
  ngAfterViewInit(): void {
    this.fecha = this.formatDate(this.post.created_at);
    
  }


  openModalC(id : any) {
    this.toggleModalEvent.emit(id);
  }

  like(id : any) {
    this.toggleLikeEvent.emit(id);
    console.log('like in postcard',id)
  }

  dislike(id : any) {
    this.toggleDislikeEvent.emit(id);
    console.log('dislike in postcard',id)
  }

  

  

  onSubmit() {

    if (this.commentForm.invalid) {
      console.log('invalid')
    } else {
      this.toggleCommentEvent.emit({ id: this.post.id, content: ''+this.commentForm.value.comment});
      this.commentForm.reset();
    }
    
  }

 

  


  formatDate(date: any) {
    
    const fechaHora = date; // Tu fecha y hora en formato ISO

    // Parseamos la fecha y hora
    const fecha = new Date(fechaHora);
    const ahora = new Date();

    // Calculamos la diferencia en milisegundos
    const diferencia = ahora.getTime() - fecha.getTime();

    // Convertimos la diferencia a segundos
    const segundos = Math.floor(diferencia / 1000);

    // Formateamos la diferencia según tus requerimientos
    let formatoDiferencia = '';
    if (segundos >= 604800) {
      formatoDiferencia = `${Math.floor(segundos / 604800)}w`;
    }
    else if (segundos >= 86400) {
      formatoDiferencia = `${Math.floor(segundos / 86400)}d`;
    }
    else if (segundos >= 3600) {
      formatoDiferencia = `${Math.floor(segundos / 3600)}h`;
    } else if (segundos >= 60) {
      formatoDiferencia = `${Math.floor(segundos / 60)}m`;
    } else {
      formatoDiferencia = `${segundos}s`;
    }
    return formatoDiferencia;
  }
}
