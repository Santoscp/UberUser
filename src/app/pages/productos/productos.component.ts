import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FloatButtonComponent } from 'src/app/components/float-button/float-button.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatMenu } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { EmpresasService } from 'src/app/services/empresas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/model/IProducto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    FloatButtonComponent, MatSidenavModule, MatMenu, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  productos!: Product[];
  id!: number | any;
  result!: any[];
  selectedProduct: any = null;
  imageBase64: string | undefined; // Aquí almacenamos la imagen Base64

  constructor(
    private router: Router,
    private productService: ProductService,
    private empresaService: EmpresasService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.productService.getAllProductsByCompanies(this.id).subscribe(productos => {
        console.log(productos);
        this.productos = productos;

        // Si el servidor devuelve una imagen en Base64, puedes asignarla a esta propiedad
        if (productos.length > 0) {
          this.imageBase64 = productos[0].image;  // Suponiendo que 'image' es el campo Base64
        }

        console.log(this.productos);
      });
    });
  }

  addToCart(p: Product) {
    this.cartService.addProductToCart(p);
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  handleFabClick() {
    this.router.navigate(['carrito']);
  }
}
