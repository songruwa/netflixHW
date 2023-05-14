import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../service/movie.service';
import { MovieDetail } from '../../../movie-detail.interface';
import { MatDialog } from '@angular/material/dialog'; 
import { Video } from '../video.interface';
import { Movie } from 'src/app/movie.interface';
import { YoutubeComponent } from '../youtube/youtube.component';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit{
  moviedetail!: MovieDetail;
  movie!: Movie;
  movieId!: number;
  movieVideos: Video[] = [];
  hasPoster_img = true;
  hasBackdrop_img = true;
  poster_img_high = '';
  backdrop_img_high = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.movieService.getMovieDetail(this.movieId).subscribe(movie => {
        this.moviedetail = movie;
        this.movie = movie;
      });
    });
  }

  // https://www.nerd.vision/post/how-to-pass-data-to-a-matdialog
  openDialog(): void { // Add openDialog method
    const dialogRef = this.dialog.open(YoutubeComponent, {
      data: {
        movieId: this.movieId,
        movieVideos: this.movieVideos, 
        hasposter_img: this.hasPoster_img, 
        hasbackdrop_img: this.hasBackdrop_img,
        poster_img_high: this.poster_img_high, 
        backdrop_img_high: this.backdrop_img_high,
      },
      backdropClass: 'backdropBackground',
      panelClass: 'my-panel',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
