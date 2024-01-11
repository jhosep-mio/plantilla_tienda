import React, { useEffect, useState } from 'react'
import fondo1 from './../../assets/home/fondo1.png'
import fondo3 from './../../assets/home/fondo3.png'
import flyer1 from './../../assets/flyers/1.jpg'
import flyer2 from './../../assets/flyers/2.jpg'
import { FaWhatsapp } from 'react-icons/fa6'
import { MdSecurity } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import { SlReload } from 'react-icons/sl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'
import 'swiper/css/grid'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'
import { Global } from '../../helper/Global'
import axios from 'axios'
import Loading from './Loading'
import {
  type marcasValues,
  type bannerValues,
  type categoriasValues,
  type productosValues,
  type blogsValues
} from '../shared/interface'
import CardProducto from './modals/CardProducto'
import { formatearURL } from '../shared/functions'

const Home = (): JSX.Element => {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [loadingComponents, setLoadingComponents] = useState(true)
  const [categoriaActive, setCategoriaActive] = useState(0)
  const [banners, setBanners] = useState([])
  const [marcas, setMarcas] = useState([])
  const [blogs, setblogs] = useState([])
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

  useEffect(() => {
    window.scrollTo(0, 0)
    Promise.all([
      getData('allCategorias', setCategorias),
      getData('allProductos', setProductos),
      getData('allBanners', setBanners),
      getData('allMarcas', setMarcas),
      getData('allBlogs', setblogs)
    ]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  return (
    <>
      {loadingComponents && <Loading />}
      <section className="pt-[120px] md:pt-0">
        <div className="bg-[#F2F2F0] h-full md:h-[550px] w-full flex flex-col md:flex-row justify-end">
          <Swiper
            className="w-full h-full"
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            loop={true}
          >
            {banners.map((banner: bannerValues, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={`${Global.urlImages}/banners/${banner.imagen1}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* <section className="pt-[120px] md:pt-0">
        <div className="bg-[#F2F2F0] md:h-[550px] w-full flex flex-col md:flex-row justify-end px-4 py-4 md:py-0 md:px-20">
          <div className="w-full md:w-[40%] h-full flex justify-center items-start flex-col gap-4">
            <span className="font-bold text-3xl md:text-5xl">
              Mercado de alimentos saludables{' '}
            </span>
            <span className="font-medium text-sm text-gray-700">
              Todos los productos naturales
            </span>
            <button className="bg-paleta-500 text-sm md:text-base hover:bg-paleta-500/80 transition-colors px-4 md:px-6 py-2 md:py-3 rounded-lg text-white">
              Comprar Ahora
            </button>
          </div>
          <div className="w-[80%] mx-auto md:mx-0 md:w-1/2 h-full">
            <img
              src={fondo}
              alt=""
              className="w-full h-full object-contain p-4"
            />
          </div>
        </div>
      </section> */}
      <section className="p-4 md:p-8 border-b border-gray-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0">
          <div className="flex gap-3 items-start md:items-center justify-start md:justify-center">
            <FaWhatsapp className="text-4xl md:text-5xl text-paleta-500" />
            <div className="flex flex-col">
              <span className="text-sm md:text-base text-black font-bold uppercase">
                Chatea con nosotros
              </span>
              <span className="text-xs md:text-base">
                Atendemos las 24 horas
              </span>
            </div>
          </div>
          <div className="flex gap-3 items-start md:items-center justify-start md:justify-center">
            <MdSecurity className="text-5xl text-paleta-500" />
            <div className="flex flex-col">
              <span className="text-sm md:text-base text-black font-bold uppercase">
                Tienda 100% segura
              </span>
              <span className="text-xs md:text-base">
                Lorem ipsum dolor, sit amet !
              </span>
            </div>
          </div>
          <div className="flex gap-3 items-start md:items-center justify-start md:justify-center">
            <TbTruckDelivery className="text-5xl text-paleta-500" />
            <div className="flex flex-col">
              <span className="text-sm md:text-base text-black font-bold uppercase">
                Dellivery gratis
              </span>
              <span className="text-xs md:text-base">
                Por compras mayores a S/ 50.00
              </span>
            </div>
          </div>
          <div className="flex gap-3 items-start md:items-center justify-start md:justify-center">
            <SlReload className="text-5xl text-paleta-500" />
            <div className="flex flex-col">
              <span className="text-sm md:text-base text-black font-bold uppercase">
                3 Días para devolucion
              </span>
              <span className="text-xs md:text-base">Si existe problemas</span>
            </div>
          </div>
        </div>
      </section>
      {/* CATEGORIAS */}
      <section
        className="py-12 w-full mt-0 md:mt-10 px-4 md:px-8"
        id="categorias"
      >
        <div className="flex flex-col justify-center items-center gap-2 md:gap-3">
          <h2 className="font-bold text-3xl md:text-4xl w-full text-center">
            Nuestras Categorias
          </h2>
          <span className="text-gray-700">Productos increibles</span>
          <span className="bg-paleta-500 w-20 h-1 mt-2 rounded-2xl"></span>
          <div className="w-full">
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 2
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 40
                }
              }}
              pagination={true}
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 3000
              }}
              loop
              className="h-full w-full pt-6 pb-12"
            >
              {categorias.map((categoria: categoriasValues) => (
                <SwiperSlide key={categoria.id} className="w-full h-full">
                  <a
                    href="#productos"
                    onClick={() => {
                      setCategoriaActive(categoria.id)
                    }}
                    className="w-full flex flex-col gap-6 "
                  >
                    <img
                      src={`${Global.urlImages}/categorias/${categoria.imagen1}`}
                      alt=""
                      className="w-full h-[230px] p-4 object-cover border border-gray-300 rounded-md"
                    />
                    <span className="w-full text-center font-bold">
                      {categoria.nombre}
                    </span>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* FLYERS */}
      <section className="px-4 md:px-8 w-full pb-10">
        <div className="w-full flex flex-col md:flex-row justify-between md:h-[400px] gap-4">
          <img
            src={flyer1}
            alt=""
            className="w-full md:w-1/2 object-cover h-[150px] md:h-auto"
          />
          <img
            src={flyer2}
            alt=""
            className="w-full md:w-1/2 object-cover h-[150px] md:h-auto"
          />
        </div>
      </section>
      {/* SUGERENCIAS */}
      <section className="py-12 w-full px-4 md:px-8 max-w-[1450px] mx-auto">
        <div className="flex flex-col justify-center items-center gap-2 md:gap-3">
          <h2 className="font-bold text-3xl md:text-4xl w-full text-center">
            Sugerencias para ti
          </h2>
          <span className="text-gray-700">Productos increibles</span>
          <span className="bg-paleta-500 w-20 h-1 mt-2 rounded-2xl"></span>
          <div className="w-full">
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 1
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 40
                }
              }}
              pagination={true}
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 3000
              }}
              loop
              className="h-full w-full pt-6 pb-12"
            >
              {productos
                ?.sort(() => Math.random() - 0.5)
                .slice(0, 10)
                .map((producto: productosValues) => (
                  <SwiperSlide
                    key={producto.id}
                    className="w-full h-[350px] md:h-[300px]"
                  >
                    <div className="w-full h-full flex items-center gap-6 border-4 border-paleta-500 px-4 py-6">
                      <div className="w-1/2 h-full">
                        <img
                          src={`${Global.urlImages}/productos/${producto.imagen1}`}
                          alt=""
                          className="w-full h-full my-auto object-contain"
                        />
                      </div>
                      <div className="h-full w-1/2">
                        <div className="w-full h-full flex flex-col gap-0 justify-between">
                          <span className="text-gray-700 text-sm underline">
                            {producto.categoria}
                          </span>
                          <h3 className="font-bold text-lg line-clamp-1">
                            {producto.nombre}
                          </h3>
                          <div className="pt-6 justify-between ">
                            <div
                              className="text-gray-700 line-clamp-4"
                              dangerouslySetInnerHTML={{
                                __html: producto?.caracteristicas ?? ''
                              }}
                            ></div>
                          </div>
                          <Link
                            to={`/producto/${producto.id}-${formatearURL(
                              producto.nombre
                            )}-${producto.codigo}`}
                            className="rounded-2xl bg-paleta-500 hover:bg-paleta-500/80 transition-colors px-6 text-white mt-4 text-sm py-2 w-fit"
                          >
                            Ver producto
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* PRODUCTOS */}
      <section className="md:py-10 w-full px-4 md:px-8" id="productos">
        <div className="flex flex-col justify-center items-center gap-2 md:gap-3">
          <h2 className="font-bold text-3xl md:text-4xl w-full text-center">
            Nuestros productos
          </h2>
          {/* <span className="text-gray-700">Productos increibles</span> */}
          <span className="bg-paleta-500 w-20 h-1 mt-2 rounded-2xl"></span>
          <div className="w-full md:w-[60%] mx-auto flex flex-wrap justify-center py-6 gap-y-3">
            <span
              onClick={() => {
                setCategoriaActive(0)
              }}
              className={`w-fit font-semibold text-sm md:text-lg px-4 hover:text-paleta-500 ${
                categoriaActive == 0 ? 'text-paleta-500' : ''
              } transition-colors cursor-pointer text-gray-700`}
            >
              Todos
            </span>
            {categorias.map((categoria: categoriasValues) => (
              <span
                key={categoria.id}
                onClick={() => {
                  setCategoriaActive(categoria.id)
                }}
                className={`w-fit font-semibold text-sm md:text-lg px-4 hover:text-paleta-500 ${
                  categoria.id == categoriaActive ? 'text-paleta-500' : ''
                } transition-colors cursor-pointer text-gray-700`}
              >
                {categoria.nombre}
              </span>
            ))}
          </div>
          <div className="w-full px-0 md:px-12 relative ">
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 2
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 0
                }
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }}
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 3000,
                reverseDirection: false
              }}
              loop
              className="h-full w-full "
            >
              {productos
                ?.filter(
                  (producto: productosValues) =>
                    categoriaActive == 0 ||
                    producto.id_categoria == categoriaActive
                )
                .map((producto: productosValues) => (
                  <SwiperSlide
                    key={producto.id}
                    className="w-full border border-gray-300 px-4 py-6"
                  >
                    <CardProducto producto={producto} />
                  </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 2
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 0
                }
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }}
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 3000,
                reverseDirection: true
              }}
              loop
              className="h-full w-full  md:pt-0"
            >
              {productos
                ?.filter(
                  (producto: productosValues) =>
                    categoriaActive == 0 ||
                    producto.id_categoria == categoriaActive
                )
                .map((producto: productosValues) => (
                  <SwiperSlide
                    key={producto.id}
                    className="w-full border border-gray-300 px-4 py-6"
                  >
                    <CardProducto producto={producto} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* SEGUNDO FONDO */}
      <section>
        <div className="bg-[#F2F2F0] h-[450px] md:h-[550px] w-full flex justify-end relative px-4 md:px-0 mt-10 md:mt-0">
          <div className="w-1/2 h-full absolute inset-0">
            <img src={fondo1} alt="" className="w-full h-full object-cover hidden md:block" />
          </div>
          <div className="w-full md:w-1/2 mx-auto h-full flex justify-center items-center flex-col gap-4 z-10">
            <span className="font-bold text-3xl md:text-5xl text-center">
              BIENVENIDOS A FAUGET
            </span>
            <span className="font-medium text-sm text-gray-700 text-center">
              Brindamos toda la información y soporte con relación a nuestros
              productos y/o servicios. Gestionamos tus Quejas, devoluciones y
              sugerencias con los debidos procesos, para poder brindarte una
              respuesta oportuna.
            </span>
            <a
              href="#contacto"
              className="bg-paleta-500 text-sm md:text-base hover:bg-paleta-500/80 transition-colors px-4 md:px-6 py-2 md:py-3 rounded-lg text-white"
            >
              Contactanos
            </a>
          </div>
          <div className="w-1/2 h-full hidden md:block absolute right-0 top-0 bottom-0">
            <img src={fondo3} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
      {/* MARCAS */}
      <section className="w-full relative">
        <div className="w-[85%] mx-auto absolute right-0 left-0 -top-20 bg-white p-4 border border-gray-300 rounded-lg">
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 2
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 40
              }
            }}
            pagination={true}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 3000
            }}
            loop
            className="h-full w-full md:pt-6 pb-4 md:pb-12"
          >
            {marcas.map((marca: marcasValues) => (
              <SwiperSlide key={marca.id} className="w-full h-full">
                <div className="w-full">
                  <img
                    src={`${Global.urlImages}/marcas/${marca.imagen1}`}
                    alt=""
                    className="w-full h-[100px] object-contain mx-auto filter grayscale"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* BLOGS */}
      <section className="pt-28 md:pt-48 px-4 md:px-8" id="blogs">
        <div className="flex flex-col justify-center items-center gap-2 md:gap-3">
          <h2 className="font-bold text-3xl md:text-4xl w-full text-center">
            Ultimas noticias
          </h2>
          <span className="text-gray-700">Información de interes</span>
          <span className="bg-paleta-500 w-20 h-1 mt-2 rounded-2xl"></span>
        </div>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40
            }
          }}
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000
          }}
          loop
          className="h-full w-full pt-6 pb-12"
        >
          {blogs.map((blog: blogsValues) => (
            <SwiperSlide key={blog.id} className="w-full h-full">
              <div className="flex w-full flex-col">
                <img
                  src={`${Global.urlImages}/blogs/${blog.imagen1}`}
                  alt=""
                  className="w-full h-[250px] object-cover"
                />
                <h3 className="font-bold mt-6 text-base">{blog.titulo}</h3>
                <div
                  className="line-clamp-2 text-justify mt-5 text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: blog?.caracteristicas ?? ''
                  }}
                ></div>
                <Link
                  to={`/blog/${blog.id}-${formatearURL(blog.titulo)}`}
                  className="text-paleta-500 mt-4 hover:text-paleta-500/80 transition-colors underline"
                >
                  Ver más
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  )
}

export default Home
