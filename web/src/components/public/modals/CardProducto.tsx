import { Link } from 'react-router-dom'
import { Global } from '../../../helper/Global'
import { type productosValues } from '../../shared/interface'
import { AddProducto2 } from '../carrito/AddProducto2'
import { useState } from 'react'
import { formatearURL } from '../../shared/functions'
// import { producto2 } from "../../shared/images";

const CardProducto = ({ producto }: { producto: productosValues }): JSX.Element => {
  const [, setCantidad] = useState(1)

  return (
    <>
      <Link
        to={`/producto/${producto.id}-${formatearURL(producto.nombre)}`}
        className=""
      >
        <div className="w-full h-full flex flex-col items-center justify-between">
          <img
            src={`${Global.urlImages}/productos/${producto.imagen1}`}
            alt=""
            className="w-full h-[150px] md:h-[200px] object-contain"
          />
          <div className="flex w-full h-[160px] flex-col justify-between items-center mt-4">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-gray-700">{producto.categoria}</span>
              <h3 className="font-bold text-lg line-clamp-1">{producto.nombre}</h3>
              <span className="text-paleta-500 font-semibold text-lg">
                S/. {producto.precio}
              </span>
            </div>
            <AddProducto2
              producto={producto}
              contador={1}
              setContador={setCantidad}
              precioFinal={producto.precio}
            />
          </div>
        </div>
      </Link>
    </>
  )
}

export default CardProducto
