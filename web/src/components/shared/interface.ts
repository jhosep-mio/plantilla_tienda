export interface carrito {
  id: number | null
  nombre: string
  cantidad: number | null
  precio: number
  imagen1: string
  categoria: string
}
export interface productosValues {
  id: number
  nombre: string
  imagen1: string
  imagen2: string
  imagen3: string
  id_marca: string
  marca: string
  categoria: string
  id_subcategoria: string
  id_categoria: number
  subcategoria: string
  codigo: string
  caracteristicas: string
  especificaciones: string
  precio: number
}

export interface errorValues {
  estado: string
  texto: string
}

export interface categoriasValues {
  id: number
  nombre: string
  imagen1: string
  icono: string
}

export interface bannerValues {
  id: number
  imagen1: string
}

export interface marcasValues {
  id: number
  imagen1: string
  nombre: string
}

export interface blogsValues {
  id: number
  imagen1: string
  titulo: string
  caracteristicas: string
}

export interface ConfiguracionValues {
  id: number | null
  celular1: string
  celular2: string
  correo1: string
  correo2: string
  direccion1: string
  direccion2: string
  direccion3: string
  facebook: string
  instagram: string
  youtube: string
  linkedin: string
  tiktok: string
  whatsapp: string
  horario: string
}
