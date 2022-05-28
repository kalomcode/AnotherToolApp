import {FormControl,FormErrorMessage,Input, FormLabel} from '@chakra-ui/react'
import {Field, useField} from "formik";

//Factorizacion del input de texto en los formularios
export default function TextField({label, ...props}) {

    //hook de formik para obtener el field data y los errors y touched de cada field
    const [field, meta] = useField(props) 

    return(
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel> {label} </FormLabel>
            <Field
            as={Input}
            {...field} //aqui van los props de onblur, on change
            {...props} //props que pasamos como placeholder etc
            />
            <FormErrorMessage> {meta.error} </FormErrorMessage>
        </FormControl>
    )
}