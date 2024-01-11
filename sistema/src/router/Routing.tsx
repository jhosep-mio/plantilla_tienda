import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import { Login } from '../components/public/Login'
import { PrivateLayout } from '../components/private/PrivateLayout'
import Home from '../components/private/tables/Home'

import { ListaCategorias } from '../components/private/tables/categorias/ListaCategorias'
import { CrearCategoria } from '../components/private/tables/categorias/CrearCategoria'
import { EditarCategoria } from '../components/private/tables/categorias/EditarCategoria'
import { ListaProductos } from '../components/private/tables/productos/ListaProductos'
import { CrearProducto } from '../components/private/tables/productos/CrearProducto'
import { EditarProducto } from '../components/private/tables/productos/EditarProducto'

import { EditarNosotros } from '../components/private/tables/nosotros/EditarNosotros'
import { CrearNosotros } from '../components/private/tables/nosotros/CrearNosotros'
import { ListaNosotros } from '../components/private/tables/nosotros/ListarNosotros'
import { EditarContacto } from '../components/private/tables/contacto/EditarContacto'
import { ListaMarcas } from '../components/private/tables/marcas/ListarMarcas'
import { AgregarMarca } from '../components/private/tables/marcas/AgregarMarca'
import { EditarMarca } from '../components/private/tables/marcas/EditarMarca'
import { ListarBlogs } from '../components/private/tables/blogs/ListarBlogs'
import { AgregarBlog } from '../components/private/tables/blogs/AgregarBlog'
import { EditarBlog } from '../components/private/tables/blogs/EditarBlog'
import { ListaSubcategorias } from '../components/private/tables/subcategorias/ListaSubcategorias'
import { CrearSubcategoria } from '../components/private/tables/subcategorias/CrearSubcategoria'
import { EditarSubcategoria } from '../components/private/tables/subcategorias/EditarSubcategoria'
import { ListarBanners } from '../components/private/tables/banner/ListarBanners'
import { AgregarBanner } from '../components/private/tables/banner/AgregarBanner'
import { EditarBanner } from '../components/private/tables/banner/EditarBanner'

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<PrivateLayout />}>
            <Route index element={<Home />} />
            {/* BANNERS
            <Route path="banners" element={<ListaBanners />} />
            <Route path="banners/agregar" element={<CrearBanner />} />
            <Route path="banners/editar/:id" element={<EditarBanner />} /> */}
            {/* SECCIONUNO */}

            {/* CATEGORIAS */}
            <Route path="categorias" element={<ListaCategorias />} />
            <Route path="categorias/agregar" element={<CrearCategoria />} />
            <Route path="categorias/editar/:id" element={<EditarCategoria />} />

            {/* CATEGORIAS */}
            <Route path="subcategorias" element={<ListaSubcategorias />} />
            <Route path="subcategorias/agregar" element={<CrearSubcategoria />} />
            <Route path="subcategorias/editar/:id" element={<EditarSubcategoria />} />

            {/* BANNER */}
            <Route path="banners" element={<ListarBanners />} />
            <Route path="banners/agregar" element={<AgregarBanner />} />
            <Route path="banners/editar/:id" element={<EditarBanner />} />

            {/* MARCAS */}
            <Route path="marcas" element={<ListaMarcas />} />
            <Route path="marcas/agregar" element={<AgregarMarca />} />
            <Route path="marcas/editar/:id" element={<EditarMarca />} />

            {/* PRODUCTOS */}
            <Route path="productos" element={<ListaProductos />} />
            <Route path="productos/agregar" element={<CrearProducto />} />
            <Route path="productos/editar/:id" element={<EditarProducto />} />

            <Route path="imprenta" element={<ListaNosotros />} />
            <Route path="imprenta/agregar" element={<CrearNosotros />} />
            <Route path="imprenta/editar/:id" element={<EditarNosotros />} />

            <Route path="blogs" element={<ListarBlogs />} />
            <Route path="blogs/agregar" element={<AgregarBlog />} />
            <Route path="blogs/editar/:id" element={<EditarBlog />} />

            {/* CONFIGURACION */}
            <Route path="contacto/:id" element={<EditarContacto />} />

          </Route>
          <Route path="*" element={<>Error 404</>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
