import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import {
  type ImagenState,
} from '../../../shared/Interfaces'
import { ImageUploader } from '../../../shared/ImageUploader'

export const AgregarBanner = (): JSX.Element => {
  const navigate = useNavigate()
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })

  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')

  useEffect(() => {
    setTitle('Agregar banner')
  }, [])

  const saveCategoria = async (
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    if(!imagen1){
        Swal.fire('Debes agregar una imagen', '', 'error')
        return
    }
    if (imagen1.archivo != null) {
      data.append('imagen1', imagen1.archivo)
    }
  
    
    try {
      const respuesta = await axios.post(`${Global.url}/saveBanner`, data, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })

      if (respuesta.data.status == 'success') {
        Swal.fire('Agregado correctamente', '', 'success')
        navigate('/admin/banners')
      } else {
        Swal.fire('Error ', '', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }



  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <form
          className="bg-secondary-100 p-8 rounded-xl"
          onSubmit={saveCategoria}
        >

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Imagen<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 flex flex-col lg:flex-row items-center gap-4">
                <ImageUploader
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                setImagen={setImagen1}
                clase="1"
              />
            </div>
          </div>
          
          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/banners"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Registrar"
            />
          </div>
        </form>
          )}
    </>
  )
}
