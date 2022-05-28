import React, {useState, useContext, useEffect, useRef} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,useToast,IconButton, Flex, Text} from '@chakra-ui/react'

import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure, Switch} from '@chakra-ui/react'
import ClientForm from '../forms/ClientForm'
import SvgEdit from  './../dist/Edit'
import PopoverDelete from '../components/PopoverDelete'
import clientsApi from '../api/clientsApi'
import useApi from '../hooks/useApi'
import AuthContext from '../auth/AuthContext'

function ClientsTable(){

    const {user, authTokens} = useContext(AuthContext)
    const getClientsApi = useApi(clientsApi.getAllClients);
    const deleteClientApi = useApi(clientsApi.deleteClient);

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[fClients, setFClients] = useState([])
    const[clients, setClients] = useState([])
    const[sClient, setSClient] = useState()
    const[creating, setCreating] = useState(false)
    const switchElement = useRef();

    const updateTable = async () => {
        const {data, error} = await getClientsApi.request(user,authTokens);
        error? console.log('Error fetching...', error) 
            : setClients(data)
    }

    //Clients
    const handleDelete = async (e) =>{
        const {error} = await deleteClientApi.request(e, user, authTokens)
        if(!error){
            toast({
                title: 'Cliente borrado',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            const newClients = clients.filter((item) => item.id !== e);
            setClients(newClients)
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
        setSClient(e)
        setCreating(false)
        onOpen()
    }
    function handleCreate(){
        setSClient()
        setCreating(true)
        onOpen()
    }
    async function handleFilter(){
        switchElement.current.checked
            ? setFClients(clients.filter(item => item.moroso===true)) 
            : setFClients(clients);     
    }

    const morosos = clients.filter(item => item.moroso===true).length;

    useEffect(() => {   
        updateTable()
    },[]) 

    useEffect(() => {
        handleFilter()
    },[clients])

    return(
        <>
        <Flex justify={'space-between'}>
            <Flex p='6' gap='4' direction={'column'} shadow='md' borderRadius={'xl'} alignItems={'center'} bg='white'>
                <Text>Morosos</Text>
                <Flex gap='4' align={'center'}>
                    <Text> {morosos} </Text>
                    <Switch size='sm' colorScheme='green' ref={switchElement} onChange={()=>handleFilter()} />
                </Flex>
            </Flex>
            <Button variant='primary-out-s' onClick={()=>handleCreate()}>+ Añadir cliente</Button>
        </Flex>
        <Flex w="100%">
        <TableContainer mt='5' borderRadius='lg' w="100%" bg='white' >
        <Table variant='simple' size='md'>
            <Thead>
                <Tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Car</Th>
                <Th>Phone</Th>
                <Th>Moroso</Th>
                <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {fClients.map(client=> {
                return(
                    <Tr key={client.id}>
                        <Td>{client.id}</Td>
                        <Td>{client.name}</Td>
                        <Td>{client.car}</Td>
                        <Td>{client.telf}</Td>
                        <Td>{JSON.stringify(client.moroso)}</Td>
                        <Td>
                            <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>}  onClick={()=> handleEdit(client)} ></IconButton>  
                            <PopoverDelete onDelete={handleDelete} id={client.id} />
                        </Td>    
                    </Tr>
                )})}
            </Tbody>
        </Table>
        </TableContainer>
        </Flex>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{sClient? 'Editar Cliente': 'Crear Cliente' }</DrawerHeader>                
            <ClientForm is_creating={creating} onClose={onClose} client={sClient} clients={fClients} setClients={setFClients} updateTable={updateTable}/>
            </DrawerContent>
        </Drawer>                    
     
      </>
    );
}

export default ClientsTable;