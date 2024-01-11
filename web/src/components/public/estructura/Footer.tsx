import { FloatingWhatsApp } from 'react-floating-whatsapp'
import ico from '../../../assets/logo/icono.png'
import { TbLocationFilled } from 'react-icons/tb'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Global } from '../../../helper/Global'
import axios from 'axios'
import {
  type productosValues,
  type categoriasValues,
  type ConfiguracionValues
} from '../../shared/interface'
import { Link } from 'react-router-dom'
import { formatearURL } from '../../shared/functions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../../hooks/useAuth'
import { Errors } from '../../shared/Errors'

const SchemaContacto = Yup.object().shape({
  nombres: Yup.string()
    .required('Este campo es requerido')
    .min(3, 'Debe tener como minimo 3 digitos'),
  celular: Yup.string()
    .required('Este campo es requerido')
    .min(9, 'Debe tener como minimo 9 digitos'),
  email: Yup.string()
    .required('Este campo es requerido')
    .email('Introduce un email válido'),
  mensaje: Yup.string()
    .required('Este campo es requerido')
    .min(5, 'Debe tener como minimo 5 digitos')
})

export const Footer = (): JSX.Element => {
  const { setShowError } = useAuth()
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [data, setData] = useState<ConfiguracionValues | null>(null)
  const [loadingCorreo, setLoadingCorreo] = useState<boolean>(false)

  const getData = async (
    ruta: string,
    setDatos: React.Dispatch<React.SetStateAction<never[]>>
  ): Promise<void> => {
    try {
      const request = await axios.get(`${Global.url}/${ruta}`)
      setDatos(request.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getInfo = async (): Promise<void> => {
    try {
      const request = await axios.get(`${Global.url}/oneConfi/1`)
      setData(request.data)
    } catch (error) {
      console.log(error)
    }
  }

  const enviarCorreo = async (): Promise<void> => {
    setLoadingCorreo(true)
    const data = new FormData()
    data.append('nombres', values.nombres)
    data.append('apellidos', values.apellidos)
    data.append('email', values.email)
    data.append('celular', values.celular)
    data.append('mensaje', values.mensaje)
    try {
      const respuesta = await axios.post(`${Global.url}/enviarCorreo`, data)

      if (respuesta.data.status === 'success') {
        setShowError({
          estado: 'success',
          texto: 'Correo enviado'
        })
        resetForm()
      } else {
        setShowError({
          estado: 'error',
          texto: 'Error al enviar el correo'
        })
      }
    } catch (error) {
      console.log(error)
      setShowError({
        estado: 'error',
        texto: 'Error al enviar el correo'
      })
    }
    setLoadingCorreo(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    Promise.all([
      getData('allCategorias', setCategorias),
      getData('allProductos', setProductos),
      getInfo()
    ]).then(() => {})
  }, [])

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    resetForm
  } = useFormik({
    initialValues: {
      nombres: '',
      celular: '',
      apellidos: '',
      email: '',
      asunto: '',
      mensaje: ''
    },
    validationSchema: SchemaContacto,
    onSubmit: enviarCorreo
  })

  return (
    <>
      <footer className="w-full mt-10" id="contacto">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-gray-300">
          <div className="w-full px-4 md:px-8 py-6 md:py-12">
            <h3 className="uppercase font-bold">Categorias</h3>
            <div className="pt-8 text-gray-700 flex flex-col gap-2">
              {categorias?.slice(0, 6).map((categoria: categoriasValues) => (
                <a
                  href="#productos"
                  key={categoria.id}
                  className="hover:text-paleta-500 transition-colors cursor-pointer line-clamp-1"
                >
                  {categoria.nombre}
                </a>
              ))}
            </div>
          </div>
          <div className="w-full px-4 md:px-8 py-6 md:py-12">
            <h3 className="uppercase font-bold">Productos</h3>
            <div className="pt-8 text-gray-700 flex flex-col gap-2 ">
              {productos?.slice(0, 6).map((producto: productosValues) => (
                <Link
                  to={`/producto/${producto.id}-${formatearURL(
                    producto.nombre
                  )}-${producto.codigo}`}
                  key={producto.id}
                  className="hover:text-paleta-500 transition-colors cursor-pointer line-clamp-1"
                >
                  {producto.nombre}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full px-4 md:px-8 py-6 md:py-12 col-span-2 md:col-span-1">
            <h3 className="uppercase font-bold">Información</h3>
            <p className="pt-8  text-gray-700">{data?.direccion1}</p>
            <ul className="mt-6 flex flex-col gap-6">
              <li className="flex gap-3 items-center">
                <TbLocationFilled className="text-4xl text-gray-700" />
                <span className=" text-gray-700">{data?.direccion2}</span>
              </li>
              <li className="flex gap-3 items-center">
                <FaPhoneSquareAlt className="text-2xl text-gray-700" />
                <div className="flex flex-col">
                  <a
                    className=" text-gray-700"
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    href={`tel:+51${data?.celular1}`}
                  >
                    +51 {data?.celular1}
                  </a>
                  <a
                    className=" text-gray-700"
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    href={`tel:+51${data?.celular2}`}
                  >
                    +51 {data?.celular2}
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full px-4 md:px-8 py-6 md:py-12 col-span-2 md:col-span-3 lg:col-span-2 bg-gray-300"
          >
            <h3 className="uppercase font-bold underline">Contactanos</h3>
            <div className="mt-8 ">
              <div className="flex flex-col gap-5">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Nombres"
                    name="nombres"
                    value={values.nombres}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    className="w-full p-2 bg-white text-gray-700 placeholder:text-gray-400 rounded-lg outline-none"
                  />
                  <Errors errors={errors.nombres} touched={touched.nombres} />
                </div>
                <div className="flex gap-3">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Correo electronico"
                      value={values.email}
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 bg-white text-gray-700 placeholder:text-gray-400 rounded-lg outline-none"
                    />
                    <Errors errors={errors.email} touched={touched.email} />
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Numero de celular"
                      name='celular'
                      value={values.celular}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="off"
                      className="w-full p-2 bg-white text-gray-700 placeholder:text-gray-400 rounded-lg outline-none"
                    />
                    <Errors errors={errors.celular} touched={touched.celular} />
                  </div>
                </div>
                <div className=" w-full relative">
                  <input
                    type="text"
                    placeholder="Mensaje"
                    name="mensaje"
                    value={values.mensaje}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    className="w-full p-2 bg-white text-gray-700 placeholder:text-gray-400 rounded-lg outline-none"
                  />
                  <Errors errors={errors.mensaje} touched={touched.mensaje} />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full justify-between mt-10">
              {!loadingCorreo
                ? (
                <button type='submit' className="bg-paleta-500 px-5 py-1 md:py-2 text-white">
                  Enviar
                </button>
                  )
                : (
                <button type='button' disabled className="bg-paleta-500/80 px-5 py-1 md:py-2 text-white">
                  Enviando...
                </button>
                  )}
            </div>
          </form>
        </div>
        <div className="h-[70px] bg-[#252525] w-full flex items-center justify-center">
          <p className="w-full text-xs px-2 lg:text-base text-center text-gray-400">
            © Copyright 2016-2023 - Todos los derechos reservados Design by
            Logos Perú - Agencia de Diseño Gráfico & Desarrollo Web
          </p>
        </div>
      </footer>

      <FloatingWhatsApp
        phoneNumber={'+51987038024'}
        accountName="FAUGET"
        statusMessage="En linea"
        placeholder="Envianos un mensaje"
        chatMessage="Hola un gusto! 🤝, Como podemos ayudarte?"
        avatar={ico}
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </>
  )
}
