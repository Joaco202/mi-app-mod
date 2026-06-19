import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Map {
  private isLoaded = signal(false);
  private googleMapsAPiKey = environment.googleMapApiKey;

  loadApi(): Promise<void> {
    if (this.isLoaded()) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');

      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsAPiKey}&libraries=marker`
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.isLoaded.set(true);
        resolve();
      };

      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }
}
