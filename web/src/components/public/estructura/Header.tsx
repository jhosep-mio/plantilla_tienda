import { FaHeadphonesSimple } from 'react-icons/fa6'
import { BsBasket } from 'react-icons/bs'
import { logo } from '../../shared/images'
import facebook from './../../../assets/redes/facebook.png'
import instagram from './../../../assets/redes/instagram.png'
import tiktok from './../../../assets/redes/tik-tok.png'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ModalCart } from '../modals/ModalCart'
import { AlertSucess } from '../../shared/alerts/AlertSucess'
import useAuth from '../../../hooks/useAuth'
import { TotalHeader } from '../carrito/TotalHeader'
import { Global } from '../../../helper/Global'
import axios from 'axios'
import { type ConfiguracionValues } from '../../shared/interface'

export const Header = (): JSX.Element => {
  const { showError, setShowError, cart } = useAuth()
  const [open, setOpen] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [data, setData] = useState<ConfiguracionValues | null>(null)

  const getInfo = async (): Promise<void> => {
    try {
      const request = await axios.get(`${Global.url}/oneConfi/1`)
      setData(request.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    Promise.all([getInfo()]).then(() => {})
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (showError != null) {
        setShowError(null)
      }
    }, 3000)
  }, [showError])

  return (
    <>
      <header className="w-full bg-white fixed top-0 left-0 right-0 md:relative shadow-sm md:shadow-none z-40">
        <div className="w-full flex justify-between border-b border-gray-300 py-3 px-4 md:px-10">
          <span className="text-gray-600 text-xs md:text-base">
            Bienvenido a nuestra tienda online
          </span>
          <div className="flex gap-3 ">
            <Link target="_blank" to={data?.facebook ?? ''}>
              <img
                src={facebook}
                className="w-5 h-5 md:w-6 md:h-6 object-contain hover:scale-105"
              />
            </Link>
            <Link target="_blank" to={data?.instagram ?? ''}>
              <img
                src={instagram}
                className="w-5 h-5 md:w-6 md:h-6 object-contain hover:scale-105"
              />
            </Link>
            <Link target="_blank" to={data?.tiktok ?? ''}>
              <img
                src={tiktok}
                className="w-5 h-5 md:w-6 md:h-6 object-contain hover:scale-105"
              />
            </Link>
          </div>
        </div>
        <nav className="w-full flex items-center py-3 px-4 md:px-10 border-b border-gray-300">
          <div className="w-[30%] hidden md:flex items-center h-full gap-3">
            <FaHeadphonesSimple className="h-full my-auto text-paleta-500 text-3xl" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">LLAMANOS</span>
              <a
                href={`tel:+51${data?.celular1 ?? ''}`}
                className="font-bold text-base"
              >
                +51 {data?.celular1}
              </a>
            </div>
          </div>
          <div className="w-[30%] flex md:hidden items-center h-full gap-3">
            <GiHamburgerMenu
              className="h-full my-auto  text-3xl"
              onClick={() => {
                setOpen(!open)
              }}
            />
          </div>
          <div className="w-full ">
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="w-full h-[50px] md:h-[71px] object-contain"
              />
            </Link>
          </div>
          <div className="w-[30%] flex gap-3 items-center justify-end">
            <div className="relative">
              <BsBasket
                className="text-gray-700 text-2xl hover:text-paleta-500 transition-colors cursor-pointer"
                onClick={() => {
                  setOpenCart(!openCart)
                }}
              />
              <span className="w-4 h-4 bg-red-600 text-white absolute -top-2 -right-3 rounded-full text-xs flex justify-center items-center">
                {cart.length}
              </span>
            </div>
            <TotalHeader />
          </div>
        </nav>
        <div className="w-full hidden md:block">
          <ul className="flex gap-5 md:gap-10 justify-center py-4 w-full ">
            <a
              href="/#categorias"
              className="hover:text-paleta-500 transition-colors text-sm md:text-base"
            >
              Categorias
            </a>
            <a
              href="/#productos"
              className="hover:text-paleta-500 transition-colors text-sm md:text-base"
            >
              Productos
            </a>
            <a
              href="/#contacto"
              className="hover:text-paleta-500 transition-colors text-sm md:text-base"
            >
              Contacto
            </a>
            <a
              href="/#blogs"
              className="hover:text-paleta-500 transition-colors text-sm md:text-base"
            >
              Blogs
            </a>
          </ul>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, left: '-100%' }}
              animate={{ opacity: 1, left: '0%' }}
              exit={{ opacity: 0, left: '-100%' }}
              className="bg-gray-100 shadow-md w-full  absolute top-full z-10 left-0 right-0 md:hidden"
            >
              <ul className="flex flex-col gap-5 md:gap-10 px-4 justify-center py-4 w-full border-b border-b-gray-300">
                <a
                  href="/#categorias"
                  onClick={() => { setOpen(false) }}
                  className="hover:text-paleta-500 transition-colors text-base"
                >
                  Categorias
                </a>
                <a
                  href="/#productos"
                  onClick={() => { setOpen(false) }}
                  className="hover:text-paleta-500 transition-colors text-base"
                >
                  Productos
                </a>
                <a
                  href="/#contacto"
                  onClick={() => { setOpen(false) }}
                  className="hover:text-paleta-500 transition-colors text-base"
                >
                  Contacto
                </a>
                <a
                  href="/#blogs"
                  onClick={() => { setOpen(false) }}
                  className="hover:text-paleta-500 transition-colors text-base"
                >
                  Blogs
                </a>
              </ul>
              <div className="flex items-center">
                <div className="w-full flex items-center h-full gap-3 p-4">
                  <FaHeadphonesSimple className="h-full my-auto text-paleta-500 text-2xl" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600">LLAMANOS</span>
                    <a
                      href={`tel:+51${data?.celular1 ?? ''}`}
                      className="font-bold text-sm"
                    >
                      +51 {data?.celular1}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <ModalCart open={openCart} setOpen={setOpenCart} />
      </header>
      <AnimatePresence>
        {showError != null && <AlertSucess showError={showError} />}
      </AnimatePresence>
    </>
  )
}
