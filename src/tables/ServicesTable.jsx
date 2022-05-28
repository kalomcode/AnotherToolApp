import React, {useState, useEffect, useContext} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,Flex, IconButton, useToast} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure, Square} from '@chakra-ui/react'
import ServiceForm from '../forms/ServiceForm'
import PopoverDelete from '../components/PopoverDelete'
import SvgEdit from  './../dist/Edit'
import servicesApi from '../api/servicesApi'
import AuthContext from '../auth/AuthContext'
import useApi from '../hooks/useApi'

function ServicesTable(){

    const {user, authTokens} = useContext(AuthContext)
    const getServicesApi = useApi(servicesApi.getAllServices);
    const deleteServiceApi = useApi(servicesApi.deleteService);

    const toast = useToast()
    const {isOpen, onOpen, onClose } = useDisclosure()
    const[services, setServices] = useState([])
    const[sService, setSService] = useState()               //selected service (when edditing)

    const updateTable = async () => {
        const {data, error} = await getServicesApi.request(user,authTokens);
        error? console.log('Error fetching...', error) 
            : setServices(data)
    }

    const handleDelete = async (e) =>{
        console.log('deleting service: ', e)
        const {error} = await deleteServiceApi.request(e, user, authTokens)
        if(!error){
            toast({
                title: 'Servicio borrado',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            const newServices = services.filter((item) => item.id !== e);
            setServices(newServices)
        }   
        else{
            console.log('error es:', error)
            toast({
                title: 'Error al borrar ',
                description: "Código de error"+ error +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }    
    }
    
    function handleEdit(e){
        setSService(e)
        onOpen()
    }
    function handleCreate(){
        setSService()
        onOpen()
    }

    useEffect(() => {  
        updateTable()        
      },[])

    return(
        <>
        <Button variant='primary' type="button" onClick={() => handleCreate()}>Crear</Button>
        <Flex w="100%">    
            <TableContainer mt='5' borderRadius='lg' w="100%" bg="white">
                <Table variant='simple'size='md'>
                <Thead>
                    <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Estimed Time</Th>
                    <Th>Price (€)</Th>
                    <Th>Color</Th>
                    <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {services.map(service=>
                        <Tr key={service.id}>
                            <Td>{service.id}</Td>
                            <Td>{service.name}</Td>
                            <Td>{service.estimed_hours} h : {service.estimed_mins} m</Td>
                            <Td >{service.baseprice}</Td>
                            <Td><Square size='18px' bg={service.color} rounded="md"/></Td>
                            <Td>
                                <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>}  onClick={() => handleEdit(service)} ></IconButton> 
                                <PopoverDelete onDelete={handleDelete} id={service.id} />
                            </Td>    
                        </Tr>
                    )}
                </Tbody>
                </Table>
            </TableContainer>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{sService? 'Editar Servicio': 'Crear Servicio' }</DrawerHeader>
                <ServiceForm onClose={onClose} service={sService} services={services} setServices={setServices} updateTable={updateTable}/>
                </DrawerContent>
            </Drawer>                    
      </Flex>
      </>
    );
}

export default ServicesTable;