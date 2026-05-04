import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  templateUrl: './star.html',
  styleUrl: './star.css',
})
export class Star {
  rating = input<number>(100, {alias: "rating"});
  //stars = signal(0);
  //arr: any[] = [];

  // ngOnChanges(): void {
  //   console.log("hijo star ngOnChanges");
  //   this.stars.set(this.rating() / 20);
  //   if (this.rating() > 0 && this.rating() <= 40) {
  //     this.stars.set(1);
  //   } else if (this.rating() > 41 && this.rating() <= 80) {
  //     this.stars.set(2);
  //   } else if (this.rating() > 81 && this.rating() <= 120) {
  //     this.stars.set(3);
  //   } else if (this.rating() > 121 && this.rating() <= 160) {
  //     this.stars.set(4);
  //   } else if (this.rating() > 161 && this.rating() <= 200) {
  //     this.stars.set(5);
  //   }
  //   this.arr = new Array(this.stars()).fill(1);
  // }
  stars = computed(() => {
    const rating = this.rating();
    if (rating <= 40) return 1;
    if (rating <= 80) return 2;
    if (rating <= 120) return 3;
    if (rating <= 160) return 4;
    if (rating <= 200) return 5;
    return 0;
  });

  arr = computed(() => Array.from({ length: this.stars() }, () => 1));
}
