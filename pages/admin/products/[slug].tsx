import React, { ChangeEvent, FC, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { AdminLayout } from "../../../components/layouts";

import {
   DriveFileRenameOutline,
   SaveOutlined,
   UploadOutlined,
} from "@mui/icons-material";

import { dbProducts } from "../../../database";

import {
   Box,
   Button,
   Card,
   CardActions,
   CardMedia,
   Checkbox,
   Chip,
   Divider,
   FormControl,
   FormControlLabel,
   FormGroup,
   FormLabel,
   Grid,
   Radio,
   RadioGroup,
   TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { tesloApi } from "../../../api";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces";

const validTypes = ["shirts", "pants", "hoodies", "hats"];
const validGender = ["men", "women", "kid", "unisex"];
const validSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

// Campos que quiero que maneje mi formulario
interface FormData {
   // Si tengo un id, significa que estoy actualizado, caso contrario, estoy creadno un nuevo producto
   _id?: string;
   description: string;
   images: string[];
   inStock: number;
   price: number;
   sizes: string[];
   slug: string;
   tags: string[];
   title: string;
   type: string;
   gender: string;
}

interface Props {
   product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
   const router = useRouter();

   // Referencia al input
   // No va a redibujar la pantalla o el componente si sufre algun cambio
   const fileInputRef = useRef<HTMLInputElement>(null);

   const [newTagValue, setNewTagValue] = useState("");
   const [isSaving, setIsSaving] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setValue,
      watch,
   } = useForm<FormData>({
      defaultValues: product,
   });

   useEffect(() => {
      const subscription = watch((value, { name, type }) => {
         /*
            En "regex" almacenamos los valores que queremos permitir. El s??mbolo ^ indica lo contrario. La expresi??n viene a decir "todos los caracteres que NO est??n entre a-z, A-Z, 0-9, y el gui??n bajo _ ".

            - La "g" significa global, o sea, en todo el texto.

            - La "i" significa "case insensitive", o sea, ignorar may??sculas y min??sculas. Este no har??a falta, pero lo pongo siempre para evitar errores.

            Al aplicarla en el replaceAll, decimos que elimine todos los caracteres que cumplan la condici??n de "regex".

            Y as?? obtendremos el "slug" m??s limpio y m??s seo friendly.
        */

         const regex = /[^a-zA-Z0-9_]/gi;
         if (name === "title") {
            // Sugerencia para el slug
            const newSlug =
               value.title
                  ?.trim()
                  .replaceAll(" ", "_")
                  .replaceAll(regex, "")
                  .toLowerCase() || "";

            setValue("slug", newSlug);
         }
      });

      return () => subscription.unsubscribe();
   }, [watch, setValue]);

   const onChangeSize = (size: string) => {
      // Valores seleccionados
      const currentSize = getValues("sizes");

      // Si hace click en un size ya seleccionado significa que lo quiere eliminar
      if (currentSize.includes(size)) {
         return setValue(
            "sizes",
            currentSize.filter((s) => s !== size),
            { shouldValidate: true }
         );
      }

      // Para agregar
      setValue("sizes", [...currentSize, size], { shouldValidate: true });
   };

   const onNewTag = () => {
      const newTag = newTagValue.trim().toLowerCase();
      setNewTagValue("");
      const currentTags = getValues("tags");

      if (currentTags.includes(newTag)) {
         return;
      }

      setValue("tags", [...currentTags, newTag], { shouldValidate: true });
   };

   const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      // Dentro del evento target vienen los archivos
      if (!target.files || target.files.length === 0) {
         return;
      }

      try {
         // console.log(file);
         for (const file of target.files) {
            const formDataFile = new FormData();

            formDataFile.append("file", file);

            const { data } = await tesloApi.post<{ message: string }>(
               "/admin/upload",
               formDataFile
            );

            setValue("images", [...getValues("images"), data.message], {
               shouldValidate: true,
            });
            console.log(data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const onDeleteTag = (tag: string) => {
      const currentTags = getValues("tags");

      const updateTags = currentTags.filter((t) => t !== tag);

      return setValue("tags", updateTags, { shouldValidate: true });
   };

   const onDeleteImage = (image: string) => {
      const filterImages = getValues("images").filter((img) => img !== image);

      // Solamente lo estoy eliminando visualmente del estado
      setValue("images", filterImages, { shouldValidate: true });
   };

   // * Objetivo, poder cargar y actualizar en la misma pantalla
   const onSubmit = async (formData: FormData) => {
      if (formData.images.length < 2) {
         return alert("M??nimo 2 imagenes");
      }

      // Evitar el doble posteo
      setIsSaving(true);

      // Siempre que se realiza una peticion puede fallar
      try {
         const { data } = await tesloApi({
            url: "/admin/products",
            method: formData._id ? "PUT" : "POST", // si tenemos un _id, hay que actualizar, si no hay que crear.
            data: formData, // formData => todo el estado del producto
         });
         // Por defecto mongoose no manda el nuevo objeto en la respuesta

         console.log({ data });

         if (!formData._id) {
            router.replace(`/admin/products/${formData.slug}`);
         } else {
            setIsSaving(false);
         }
      } catch (error) {
         console.log(error);
         setIsSaving(false);
      }
   };

   return (
      <AdminLayout
         title={"Producto"}
         subTitle={`Editando: ${product.title}`}
         icon={<DriveFileRenameOutline />}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
               <Button
                  color="secondary"
                  startIcon={<SaveOutlined />}
                  sx={{ width: "150px" }}
                  type="submit"
                  disabled={isSaving}
               >
                  Guardar
               </Button>
            </Box>

            <Grid container spacing={2}>
               {/* Data */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="T??tulo"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register("title", {
                        required: "Este campo es requerido",
                        minLength: { value: 2, message: "M??nimo 2 caracteres" },
                     })}
                     error={!!errors.title}
                     helperText={errors.title?.message}
                  />

                  <TextField
                     label="Descripci??n"
                     variant="filled"
                     fullWidth
                     multiline
                     sx={{ mb: 1 }}
                     {...register("description", {
                        required: "Este campo es requerido",
                     })}
                     error={!!errors.description}
                     helperText={errors.description?.message}
                  />

                  <TextField
                     label="Inventario"
                     type="number"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register("inStock", {
                        required: "Este campo es requerido",
                        min: {
                           value: 0,
                           message: "M??nimo de valor cero",
                        },
                     })}
                     error={!!errors.inStock}
                     helperText={errors.inStock?.message}
                  />

                  <TextField
                     label="Precio"
                     type="number"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register("price", {
                        required: "Este campo es requerido",
                        min: {
                           value: 0,
                           message: "M??nimo de valor cero",
                        },
                     })}
                     error={!!errors.price}
                     helperText={errors.price?.message}
                  />

                  <Divider sx={{ my: 1 }} />

                  <FormControl sx={{ mb: 1 }}>
                     <FormLabel>Tipo</FormLabel>
                     <RadioGroup
                        row
                        value={getValues("type")}
                        onChange={({ target }) =>
                           setValue("type", target.value, {
                              shouldValidate: true,
                           })
                        }
                     >
                        {validTypes.map((option) => (
                           <FormControlLabel
                              key={option}
                              value={option}
                              control={<Radio color="secondary" />}
                              label={
                                 option.charAt(0).toUpperCase() +
                                 option.slice(1)
                              }
                           />
                        ))}
                     </RadioGroup>
                  </FormControl>

                  <FormControl sx={{ mb: 1 }}>
                     <FormLabel>G??nero</FormLabel>
                     <RadioGroup
                        row
                        value={getValues("gender")}
                        onChange={({ target }) =>
                           setValue("gender", target.value, {
                              shouldValidate: true,
                           })
                        }
                     >
                        {validGender.map((option) => (
                           <FormControlLabel
                              key={option}
                              value={option}
                              control={<Radio color="secondary" />}
                              label={
                                 option.charAt(0).toUpperCase() +
                                 option.slice(1)
                              }
                           />
                        ))}
                     </RadioGroup>
                  </FormControl>

                  <FormGroup>
                     <FormLabel>Tallas</FormLabel>
                     {validSizes.map((size) => (
                        <FormControlLabel
                           key={size}
                           control={
                              <Checkbox
                                 checked={getValues("sizes").includes(size)}
                              />
                           }
                           label={size}
                           onChange={() => onChangeSize(size)}
                        />
                     ))}
                  </FormGroup>
               </Grid>

               {/* Tags e imagenes */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Slug - URL"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register("slug", {
                        required: "Este campo es requerido",
                        validate: (val) =>
                           val.trim().includes(" ")
                              ? "No puede tener espacios en blanco"
                              : undefined,
                     })}
                     error={!!errors.slug}
                     helperText={errors.slug?.message}
                  />

                  <TextField
                     label="Etiquetas"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     helperText="Presiona [spacebar] para agregar"
                     onChange={({ target }) => setNewTagValue(target.value)}
                     value={newTagValue}
                     onKeyUp={({ code }) =>
                        code === "Space" ? onNewTag() : undefined
                     }
                  />

                  <Box
                     sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0,
                        m: 0,
                     }}
                     component="ul"
                  >
                     {getValues("tags").map((tag) => {
                        return (
                           <Chip
                              key={tag}
                              label={tag}
                              onDelete={() => onDeleteTag(tag)}
                              color="primary"
                              size="small"
                              sx={{ ml: 1, mt: 1 }}
                           />
                        );
                     })}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" flexDirection="column">
                     <FormLabel sx={{ mb: 1 }}>Im??genes</FormLabel>
                     <Button
                        color="secondary"
                        fullWidth
                        startIcon={<UploadOutlined />}
                        sx={{ mb: 3 }}
                        onClick={() => fileInputRef.current?.click()}
                     >
                        Cargar imagen
                     </Button>
                     {/* Oculpamos el input a la vista del cliente pero mantenemos la referencia de esta con el boton que queremos en el onClick */}
                     <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/png, image/gif, image/jpeg"
                        style={{
                           display: "none",
                        }}
                        // Cuando el fileInput cambie hay que empazar con la carga de las imagenes
                        onChange={onFileSelected}
                     />

                     <Chip
                        label="Es necesario al 2 imagenes"
                        color="error"
                        variant="outlined"
                        sx={{
                           display:
                              getValues("images").length < 2 ? "flex" : "none",
                        }}
                     />

                     <Grid container spacing={2}>
                        {getValues("images").map((img) => (
                           <Grid item xs={4} sm={3} key={img}>
                              <Card>
                                 <CardMedia
                                    component="img"
                                    className="fadeIn"
                                    image={img}
                                    alt={img}
                                 />
                                 <CardActions>
                                    <Button
                                       onClick={() => onDeleteImage(img)}
                                       fullWidth
                                       color="error"
                                    >
                                       Borrar
                                    </Button>
                                 </CardActions>
                              </Card>
                           </Grid>
                        ))}
                     </Grid>
                  </Box>
               </Grid>
            </Grid>
         </form>
      </AdminLayout>
   );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const { slug = "" } = query;

   let product: IProduct | null;

   if (slug === "new") {
      // Crear un producto
      const tempProduct = JSON.parse(JSON.stringify(new Product()));
      delete tempProduct._id;
      tempProduct.images = ["img1.jpg", "img2.jpg"];
      product = tempProduct;
   } else {
      product = await dbProducts.getProductBySlug(slug.toString());
   }

   if (!product) {
      return {
         redirect: {
            destination: "/admin/products",
            permanent: false,
         },
      };
   }

   return {
      props: {
         product,
      },
   };
};

export default ProductAdminPage;

/*
    Radio buttons:
    <Controller
  name="type"
  control={control}
  defaultValue={undefined}
  render={({ field }) => (
    <FormControl>
      <FormLabel>Tipo</FormLabel>
      <RadioGroup row {...field}>
        {validTypes.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio color="secondary" />}
            label={capitalize(option)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )}
/>
*/
