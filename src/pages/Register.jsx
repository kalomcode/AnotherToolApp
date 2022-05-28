import React, {useState} from 'react'
import { Button, useToast, Flex, Text,Heading} from '@chakra-ui/react'
import * as Yup from 'yup';
import {Formik} from "formik";
import TextField from '../forms/TextField'
import {SwitchControl} from "formik-chakra-ui";
import {useNavigate} from 'react-router-dom'
import {CheckboxSingleControl}  from "formik-chakra-ui";
import { base_url } from '../environment/global';

import bg from '../assets/register_bg.png'

export default function Register(){

    const navigate = useNavigate();
    const toast = useToast()
    const[loadingCreate, setLoadingCreate] = useState(false)

    const handleSubmit = async(values) => {
        setLoadingCreate(true)
            const userToRegister ={
                    'email': values.email,
                    'username': values.username,
                    'password': values.password,
                    'password2': values.password2,
            }
        const response = await fetch(base_url+'register/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userToRegister)
            })
        const rstatus = response.status
        if(rstatus >= 200 && rstatus<300){
            toast({
            title: 'Registro exitoso',
            status: 'success',
            duration: 6000,
            isClosable: true,
            })
            setLoadingCreate(false) 
            navigate('/klndr_front/login')
            }
            else{
                toast({
                    title: 'Error al guardar ',
                    description: "Código de error"+ rstatus +' intentalo mas tarde' ,
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                    })
                setLoadingCreate(false)
                }
        }


    return(
        <Flex w='100%' minH='100vh' direction='column' backgroundImage={bg}>
            
            <Flex height='8vh' w='100%' p='1%' align='center' justifyContent='space-between'>
                <Flex justify='start' ml='3%'>
                    <Flex onClick={() => navigate('/klndr_front/')} cursor='pointer' >
                        <Heading size='md' >another</Heading><Heading size='md' color={'blue'}>tool</Heading>
                    </Flex>
                </Flex>
                <Flex justify='end' gap='10' align='center' mr='3%' ml='3%'>
                    <Text fontWeight='bold' >¿Ya tienes una cuenta?</Text>
                    <Button variant="primary-s" size='sm'
                    onClick={() => navigate('/klndr_front/login')}
                    >Iniciar Sesión</Button>
                </Flex>
            </Flex>

            <Flex height='92vh' justify='center' align='center' w='100%'>
                <Flex py='5%'  w={['80%','65%','400px','400px']} direction='column' align='center' gap='5'>
                    <Flex><Heading size='lg' >another</Heading><Heading size='lg' color={'blue'}>tool</Heading></Flex>
                    <Flex bg='white' w='100%' rounded='xl' direction='column' align='center'  gap='3' py='12%' boxShadow='lg'>
                        <Heading size='md'> ¡Bienvenido! </Heading>
                        <Formik
                        initialValues = {{
                            email: "",
                            username: "",
                            password: "",
                            password2: "",
                            terms: false,
                        }
                        }
                        validationSchema = {Yup.object({
                            email: Yup.string().email('Formato de email inválido').required("Email es obligatorio"),
                            username: Yup.string().required("Usuario es obligatorio"),
                            password: Yup.string().min(8, 'Contraseña demasiado corta - mínimo 8 caracteres')
                                        .matches(/[a-zA-Z]/, 'Solo puede contener letras del abecedario'),
                            password2: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
                            terms: Yup.boolean().equals([true],'Debes aceptar los términos')
                        })}
                        onSubmit= {(values, actions) => {
                            //alert(JSON.stringify(values))
                            handleSubmit(values)
                            actions.resetForm()
                        }}
                        >
                        {formik => (
                        <Flex  onKeyDown={(e)=> {if(e.key === "Enter"){formik.handleSubmit()}}} as="form" direction={'column'} w='80%' justify='space-around' align='center' gap='3'>
                            <TextField placeholder="Correo electrónico" name="email" />
                            <TextField placeholder="Usuario" name="username" />
                            <TextField placeholder="Contraseña" name="password" type="password" />
                            <Flex direction={'column'} align='start'  >
                                <Text color='gray' fontSize='xs' fontWeight='hairline'>Debe tener al menos 8 caracteres</Text>
                                <Text color='gray' fontSize='xs' fontWeight='hairline'>No puede ser similar a tu otra información personal</Text>
                                <Text color='gray' fontSize='xs' fontWeight='hairline'>No puede ser enteramente numérica</Text>
                            </Flex>
                            <TextField placeholder="Repite Contraseña" name="password2" type="password" />
                            <CheckboxSingleControl name="terms">
                                <Text fontSize='xs' fontWeight='hairline'  >
                                Estoy de acuerdo con los términos del servicio y la política
                                de privacidad 
                                </Text>              
                            </CheckboxSingleControl> 
                            <Button variant="primary-s" size='md' mt='8' onClick={formik.handleSubmit} isLoading={loadingCreate}  loadingText='Iniciando...'>
                            Registrarse </Button>  
                        </Flex>
                            )}
                        </Formik>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )

}