import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import { ImageUploader } from '../../../shared/ImageUploader'
import {
  type productosValuesModificate,
  type ImagenState,
  type categoriasValues,
  type marcasValue,
  type subcategoriasValues
} from '../../../shared/Interfaces'
import { ScheamaProductos } from '../../../shared/Schemas'
import Editor from '../../../shared/Editar'
import Editor2 from '../../../shared/Editor2'

export const CrearProducto = (): JSX.Element => {
  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const [marcas, setMarcas] = useState([])
  const [content, setContent] = useState('')
  const [especificaciones, setEspecificaciones] = useState('')

  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()

  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')

  const [imagen2, setImagen2] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton2, setBoton2] = useState(false)
  const [url2, setUrl2] = useState('')

  const [imagen3, setImagen3] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton3, setBoton3] = useState(false)
  const [url3, setUrl3] = useState('')

  const saveCategoria = async (
    values: productosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('id_categoria', values.idCategoria)
    data.append('id_subcategoria', values.id_subcategoria)
    data.append('id_marca', values.id_marca)
    data.append('nombre', values.nombre)
    data.append('codigo', values.codigo)
    data.append('destacado', values.destacado)
    if (imagen1.archivo != null) {
      data.append('imagen1', imagen1.archivo)
    }
    if (imagen2.archivo != null) {
      data.append('imagen2', imagen2.archivo)
    }
    if (imagen3.archivo != null) {
      data.append('imagen3', imagen3.archivo)
    }

    data.append('caracteristicas', content)
    data.append('especificaciones', especificaciones)

    try {
      const respuesta = await axios.post(`${Global.url}/saveProducto`, data, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })

      if (respuesta.data.status == 'success') {
        Swal.fire('Agregado correctamente', '', 'success')
        navigate('/admin/productos')
      } else {
        Swal.fire('Error ', '', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }

  const getCategorias = async (): Promise<void> => {
    setLoadingComponents(true)
    const request = await axios.get(`${Global.url}/allCategorias`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setCategorias(request.data)
    setLoadingComponents(false)
  }

  const getSubcategorias = async (): Promise<void> => {
    setLoadingComponents(true)
    const request = await axios.get(`${Global.url}/allSubcategorias`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setSubcategorias(request.data)
    setLoadingComponents(false)
  }

  const getMarcas = async (): Promise<void> => {
    setLoadingComponents(true)
    const request = await axios.get(`${Global.url}/allMarcas`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setMarcas(request.data)
    setLoadingComponents(false)
  }

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: '',
        idCategoria: '',
        id_subcategoria: '',
        id_marca: '',
        destacado: '',
        pdf: null,
        codigo: ''
      },
      validationSchema: ScheamaProductos,
      onSubmit: saveCategoria
    })

  useEffect(() => {
    setTitle('Registrar equipo')
    getCategorias()
    getSubcategorias()
    getMarcas()
  }, [])

  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <form
          className="bg-secondary-100 p-8 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <div className="w-full lg:w-1/3">
              <TitleBriefs titulo="Nombre del producto" />
              <InputsBriefs
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
            <div className="w-full md:w-1/3">
              <TitleBriefs titulo="Asignar categoria" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="idCategoria"
                value={values.idCategoria}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {categorias.map((categoria: categoriasValues) => (
                  <option value={categoria.id} key={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <Errors
                errors={errors.idCategoria}
                touched={touched.idCategoria}
              />
            </div>
            <div className="w-full md:w-1/3">
              <TitleBriefs titulo="Asignar subcategoria" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="id_subcategoria"
                value={values.id_subcategoria}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {subcategorias.map((subcategoria: subcategoriasValues) => (
                  <option value={subcategoria.id} key={subcategoria.id}>
                    {subcategoria.nombre}
                  </option>
                ))}
              </select>
              <Errors
                errors={errors.id_subcategoria}
                touched={touched.id_subcategoria}
              />
            </div>
          </div>
          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <div className="w-full md:w-1/3">
              <TitleBriefs titulo="Asignar marca" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="id_marca"
                value={values.id_marca}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {marcas.map((marca: marcasValue) => (
                  <option value={marca.id} key={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
              <Errors errors={errors.id_marca} touched={touched.id_marca} />
            </div>
            <div className="w-full md:w-1/3">
              <TitleBriefs titulo="Destacado" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="destacado"
                value={values.destacado}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
              <Errors errors={errors.destacado} touched={touched.destacado} />
            </div>
            <div className="w-full lg:w-1/3">
              <TitleBriefs titulo="Modelo del producto" />
              <InputsBriefs
                name="codigo"
                type="text"
                value={values.codigo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.codigo} touched={touched.codigo} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Imagenes del producto<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 flex flex-col lg:flex-row  items-center gap-4">
              <ImageUploader
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                setImagen={setImagen1}
                clase="1"
              />
              <ImageUploader
                url={url2}
                setUrl={setUrl2}
                boton={boton2}
                setBoton={setBoton2}
                setImagen={setImagen2}
                clase="2"
              />
              <ImageUploader
                url={url3}
                setUrl={setUrl3}
                boton={boton3}
                setBoton={setBoton3}
                setImagen={setImagen3}
                clase="3"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-18 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Detalle del producto
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={content} setContent={setContent} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mt-20 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Especificaciones del producto
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor2 content={especificaciones} setContent={setEspecificaciones} />
            </div>
          </div>
          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/productos"
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
