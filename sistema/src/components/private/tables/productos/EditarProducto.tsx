import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import {
  type productosValuesModificate,
  type ImagenState,
  type categoriasValues,
  type marcasValue,
  type subcategoriasValues
} from '../../../shared/Interfaces'
import { ScheamaProductos } from '../../../shared/Schemas'
import Editor from '../../../shared/Editar'
import { ImageUpdate } from '../../../shared/ImageUpdate'
import Editor2 from '../../../shared/Editor2'

export const EditarProducto = (): JSX.Element => {
  const { id } = useParams()
  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const [subcategorias, setSubcategorias] = useState([])

  const [marcas, setMarcas] = useState([])
  const [content, setContent] = useState('')
  const [especificaciones, setEspecificaciones] = useState('')

  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [imagen1, setImagen1] = useState('')
  const [imagenNueva1, setImagenNueva1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })

  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')

  const [imagen2, setImagen2] = useState('')
  const [imagenNueva2, setImagenNueva2] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton2, setBoton2] = useState(true)
  const [url2, setUrl2] = useState('')

  const [imagen3, setImagen3] = useState('')
  const [imagenNueva3, setImagenNueva3] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton3, setBoton3] = useState(true)
  const [url3, setUrl3] = useState('')

  useEffect(() => {
    setLoadingComponents(true)
    setTitle('Editar equipo')
    Promise.all([
      getCategorias(),
      getMarcas(),
      getProducto(),
      getSubcategorias()
    ]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  const updateProducto = async (
    values: productosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('id_categoria', values.idCategoria)
    data.append('id_subcategoria', values.id_subcategoria)
    data.append('codigo', values.codigo)
    data.append('destacado', values.destacado)
    data.append('id_marca', values.id_marca)
    data.append('nombre', values.nombre)
    if (imagenNueva1.archivo != null) {
      console.log(imagenNueva1.archivo)
      data.append('imagen1', imagenNueva1.archivo)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    data.append('imagen2', imagenNueva2.archivo)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    data.append('imagen3', imagenNueva3.archivo)

    data.append('caracteristicas', content)
    data.append('especificaciones', especificaciones)

    data.append('_method', 'PUT')

    try {
      const respuesta = await axios.post(
        `${Global.url}/updateProducto/${id ?? ''}}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )

      if (respuesta.data.status == 'success') {
        Swal.fire('Actualizado correctamente', '', 'success')
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
    const request = await axios.get(`${Global.url}/allCategorias`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setCategorias(request.data)
  }

  const getMarcas = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/allMarcas`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setMarcas(request.data)
  }

  const getProducto = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneProducto/${id ?? ''}`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== '' ? `Bearer ${token}` : ''
        }`
      }
    })
    setValues({
      ...values,
      idCategoria: request.data[0].id_categoria,
      id_subcategoria: request.data[0].id_subcategoria,
      nombre: request.data[0].nombre,
      id_marca: request.data[0].id_marca,
      destacado: request.data[0].destacado,
      codigo: request.data[0].codigo
    })
    setImagen1(request.data[0].imagen1)
    setImagen2(request.data[0].imagen2)
    setImagen3(request.data[0].imagen3)
    setContent(request.data[0].caracteristicas)
    setEspecificaciones(request.data[0].especificaciones)
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

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    setValues
  } = useFormik({
    initialValues: {
      nombre: '',
      idCategoria: '',
      id_subcategoria: '',
      id_marca: '',
      pdf: null,
      destacado: '',
      codigo: ''
    },
    validationSchema: ScheamaProductos,
    onSubmit: updateProducto
  })

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
          id="update_producto"
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
            <div className="flex-1 flex flex-col lg:flex-row items-center gap-4">
              <ImageUpdate
                globalUrl="productos"
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                imagen={imagen1}
                setImagen={setImagenNueva1}
                clase="1"
              />
              <ImageUpdate
                globalUrl="productos"
                url={url2}
                setUrl={setUrl2}
                boton={boton2}
                setBoton={setBoton2}
                imagen={imagen2}
                setImagen={setImagenNueva2}
                clase="2"
              />
              <ImageUpdate
                globalUrl="productos"
                url={url3}
                setUrl={setUrl3}
                boton={boton3}
                imagen={imagen3}
                setBoton={setBoton3}
                setImagen={setImagenNueva3}
                clase="3"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
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
              <Editor2
                content={especificaciones}
                setContent={setEspecificaciones}
              />
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
              value="Editar"
            />
          </div>
        </form>
          )}
    </>
  )
}
