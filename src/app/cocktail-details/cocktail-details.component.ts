import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail';
import { FavoriteService } from '../services/favorite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from '../services/cocktail.service';
import {CommonModule} from'@angular/common'
import { MatIconModule } from '@angular/material/icon'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatSnackBarModule],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss'
})
export class CocktailDetailsComponent  implements OnInit  {
  cocktail: Cocktail;
  constructor(private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private router: Router,
    private  cocktailService: CocktailService,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCocktailDetail();
  }
  getCocktailDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.cocktailService.getCocktailDetail(id)
        .subscribe(res => this.cocktail= res);
    } else {
      this.snackBar.open('Error: Cocktail ID is null', 'Close', {
        duration: 5000, 
        panelClass: ['error-toast'],
        verticalPosition: 'top' 
      });
    }
  }
  addCocktailFavorite() {
    if (this.cocktail) {
      if (this.favoriteService.isCocktailFavorite(this.cocktail.id)) {
        this.favoriteService.removeFavorite(this.cocktail.id);
      } else {
        this.favoriteService.addFavorite(this.cocktail.id);
      }
    }
  }

  isFavCocktail(): boolean {
    return this.cocktail ? this.favoriteService.isCocktailFavorite(this.cocktail.id) : false;
  }
  goBack(): void {
    this.router.navigate(['/cocktails']);
  }
}
