import React, {useState, useEffect} from 'react'
import {Button, VStack,FormErrorMessage,FormHelperText,Input, useDisclosure, useToast} from '@chakra-ui/react'
import {Popover,PopoverTrigger,PopoverContent, PopoverHeader, PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton, ButtonGroup} from '@chakra-ui/react'
import {Field, Formik, useFormik} from "formik";
import * as Yup from 'yup';
import TextField from './TextField'

function PopoverClientForm({setClients, setClient}){
    
    const initialFocusRef = React.useRef()
    const [isOpen, setIsOpen] = React.useState(false)
    const open = () => setIsOpen(!isOpen)

    const toast = useToast()
    const[loadingDelete, setLoadingDelete] = useState(false)
    const[loadingCreate, setLoadingCreate] = useState(false)
        
    function closePopover(){
        setLoadingDelete(false)
        setLoadingCreate(false)
        open()
    }

    const handleSubmit = async(values) => {
    setLoadingCreate(true)
        const clientToCreate ={
                'name': values.name,
                'car': values.car,
                'telf': values.telf,
        }
    const response = await fetch('https://plabo.pythonanywhere.com/api/createclient',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientToCreate)
        })
    const rstatus = response.status
    if(rstatus >= 200 && rstatus<300){
        toast({
        title: 'Cliente guardado',
        status: 'success',
        duration: 6000,
        isClosable: true,
        }) 
        const newdata= await response.json()
        setClients((clients) => [...clients, newdata])
        setClient(newdata.id)
        closePopover()
        }
        else{
            toast({
                title: 'Error al guardar ',
                description: "Código de error"+ rstatus +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
                })
                closePopover()
            }
    }

    return(
        <>
        <Popover 
        closeOnBlur={false}
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        >
        <PopoverTrigger>
            <Button width={'100px'} onClick={open} colorScheme='orange' size='sm' type="button">Crea Uno</Button>
        </PopoverTrigger>
        <PopoverContent w="240px" p='2' boxShadow={'lg'} >
            <PopoverArrow />
                    
                    <Formik
                        initialValues= {{name: '' ,car: '',telf:''}}
                        validationSchema = {Yup.object({
                            name: Yup.string().required("Nombre es obligatorio"),
                            car: Yup.string().required("Coche es obligatorio"),
                            telf: Yup.string().required("Coche es obligatorio")
                            .min(9, "Debe ser de 9 dígitos")
                            .max(9, "Debe se de 9 dígitos"),
                        })}
                        onSubmit= {(values, actions) => {
                            handleSubmit(values)
                            actions.resetForm()
                        }}
                        >
                        {formik => (
                        <>
                        <PopoverBody>  
                            <VStack>
                                <TextField label="Nombre" name="name" />
                                <TextField label="Coche" name="car" />
                                <TextField label="Teléfono" name="telf" />
                            </VStack>      
                        </PopoverBody>
                        <PopoverFooter border='0' d='flex' alignItems='center' justifyContent='flex-end' pb={4}>
                            <ButtonGroup justify="right" columnGap="3" mt='3'>
                                <Button variant='ghost' colorScheme='red' size='sm' onClick={closePopover}>Cancelar</Button>
                                <Button colorScheme='orange' size='sm' onClick={formik.handleSubmit} isLoading={loadingCreate} loadingText='Guardando'>  Guardar </Button>
                            </ButtonGroup>  
                        </PopoverFooter>
                        </>
                            )}
                        </Formik>
            </PopoverContent>
        </Popover>
        </>
    )
}

export default PopoverClientForm;