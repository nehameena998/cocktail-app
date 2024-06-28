
import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail';
import { CocktailService } from '../services/cocktail.service';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
import { FavoriteService } from '../services/favorite.service';
import {RouterModule} from '@angular/router'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule, MatCardModule, MatInputModule, MatFormFieldModule],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})

export class CocktailListComponent implements OnInit {
  cocktails: Cocktail[] = [];
  filteredCocktails: Cocktail[] = [];
  filterText: string = '';
  constructor(private cocktailService: CocktailService,private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.getCocktailList();
  }

  getCocktailList() {
    this.cocktailService.getCocktails().subscribe(cocktails => {
      this.cocktails = cocktails;
      this.filteredCocktails = cocktails;
    });
  }
  applyFilter() {
    this.filteredCocktails = this.cocktails.filter(cocktail =>
      cocktail.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
  addCocktailFavorite(cocktailId: string) {
    if (this.favoriteService.isCocktailFavorite(cocktailId)) {
      this.favoriteService.removeFavorite(cocktailId);
    } else {
      this.favoriteService.addFavorite(cocktailId);
    }
  }

  isFavCocktail(cocktailId: string): boolean {
    return this.favoriteService.isCocktailFavorite(cocktailId);
  }

}

