import React, {useState, useEffect, useContext} from 'react'
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,Flex, IconButton, useToast} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure, Square} from '@chakra-ui/react'
import PopoverDelete from '../components/PopoverDelete'
import moment from 'moment';
import adminApi from '../api/adminApi'
import AuthContext from '../auth/AuthContext'
import useApi from '../hooks/useApi'

import {AiOutlineCheck} from 'react-icons/ai';
import {ImCross} from 'react-icons/im';

function AdminPanel(){

    const {user, authTokens} = useContext(AuthContext)
    const getUsersApi = useApi(adminApi.getAllUsers);

    const toast = useToast()
    const[users, setUsers] = useState([])

    const updateTable = async () => {
        const {data, error} = await getUsersApi.request(user,authTokens);
        error? console.log('Error fetching...', error) 
            : setUsers(data)
    }

    useEffect(() => {  
        updateTable()        
      },[])

    return(
        <>
        <Flex w="100%" justify='center' align='center'>    
            <TableContainer mt='5%' borderRadius='lg' w="80%" bg="white">
                <Table variant='simple'size='md'>
                <Thead>
                    <Tr>
                    <Th>Id</Th>
                    <Th>Username</Th>
                    <Th>email</Th>
                    <Th>Is Active</Th>
                    <Th>Last Login</Th>
                    <Th>Date Joined</Th>
                    <Th>Is Staff</Th>
                    <Th>Is SuperUser</Th>
                    <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user=>
                        <Tr key={user.id}>
                            <Td>{user.id}</Td>
                            <Td>{user.username}</Td>
                            <Td>{user.email}</Td>                
                            <Td>{user.is_active
                            ?<AiOutlineCheck className='svg-green' />
                            : <ImCross className='svg-red'/>}</Td>
                            <Td>{moment(user.last_login).format("DD/MM/YYYY, hh:mm")}</Td>
                            <Td>{moment(user.date_joined).format("DD/MM/YYYY, hh:mm")}</Td>
                            <Td>{user.is_staff
                            ?<AiOutlineCheck className='svg-green' />
                            : <ImCross className='svg-red'/>}</Td>
                            <Td>{user.is_superuser
                            ?<AiOutlineCheck className='svg-green' />
                            : <ImCross className='svg-red'/>}</Td>
                            <Td></Td>
                        </Tr>
                    )}
                </Tbody>
                </Table>
            </TableContainer>                  
      </Flex>
      </>
    );
}

export default AdminPanel;