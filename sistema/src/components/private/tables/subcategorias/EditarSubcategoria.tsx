import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { Global } from "../../../../helper/Global";
import Swal from "sweetalert2";
import { Loading } from "../../../shared/Loading";
import { useFormik } from "formik";
import { SchemaCategorias } from "../../../shared/Schemas";
import { TitleBriefs } from "../../../shared/TitleBriefs";
import { InputsBriefs } from "../../../shared/InputsBriefs";
import { Errors } from "../../../shared/Errors";
import {
    categoriasValues,
    subcategoriasValuesMoficate,
} from "../../../shared/Interfaces";

export const EditarSubcategoria = (): JSX.Element => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth();

  useEffect(() => {
    setTitle("Editar Subcategoria");
    getBanner();
    getCategorias()
  }, []);

  const saveCategoria = async (
    values: subcategoriasValuesMoficate
  ): Promise<void> => {
    setLoadingComponents(true);
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("nombre", values.nombre);
    data.append("id_categoria", values.id_categoria);


    data.append("_method", "PUT");

    try {
      const respuesta = await axios.post(
        `${Global.url}/updateSubcategoria/${id ?? ""}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== "" ? token : ""
            }`,
          },
        }
      );

      if (respuesta.data.status == "success") {
        Swal.fire("Actualizado correctamente", "", "success");
        navigate("/admin/subcategorias");
      } else {
        Swal.fire("Error ", "", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "", "error");
    }
    setLoadingComponents(false);
  };

  const getBanner = async (): Promise<void> => {
    setLoadingComponents(true);
    const request = await axios.get(`${Global.url}/oneSubcategoria/${id ?? ""}`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== "" ? `Bearer ${token}` : ""
        }`,
      },
    });
    setValues({
      ...values,
      nombre: request.data.nombre,
      id_categoria: request.data.id_categoria
    });

    setLoadingComponents(false);
  };

  const [categorias, setCategorias] = useState([]);

  const getCategorias = async (): Promise<void> => {
    setLoadingComponents(true);
    const request = await axios.get(`${Global.url}/allCategorias`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== "" ? token : ""}`,
      },
    });
    setCategorias(request.data);
    setLoadingComponents(false);
  };

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setValues,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      nombre: "",
      id_categoria: ''
    },
    validationSchema: SchemaCategorias,
    onSubmit: saveCategoria,
  });

  return (
    <>
      {loadingComponents ? (
        <Loading />
      ) : (
        <form
          className="bg-secondary-100 p-8 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex gap-4">
            <div className="w-full lg:w-1/2 lg:relative mb-5">
              <TitleBriefs titulo="Nombre de la subcategoría" />
              <InputsBriefs
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
            <div className="w-full md:w-1/2">
              <TitleBriefs titulo="Asignar categoria" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="id_categoria"
                value={values.id_categoria}
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
                errors={errors.id_categoria}
                touched={touched.id_categoria}
              />
            </div>
          </div>

        

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/subcategorias"
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
  );
};
