import {Flex, Heading, Text, Button, Box, Image} from '@chakra-ui/react'
import AuthContext from '../auth/AuthContext'

import img1 from '../assets/landing1_img1.png'
import img2 from '../assets/landing2_img1.png'
import img3 from '../assets/landing3_img1.png'
import img5 from '../assets/landing5_img1.png'

import {AiOutlineCalendar, AiOutlineUnorderedList} from 'react-icons/ai';
import {MdOutlinePeopleAlt} from 'react-icons/md';
import {VscGraph} from 'react-icons/vsc';
import {FiTool} from 'react-icons/fi';
import {RiBookletLine} from 'react-icons/ri';
import {useNavigate} from 'react-router-dom'
import { useContext, useEffect } from 'react'

export default function Landing(){

    const {user, authTokens} = useContext(AuthContext)
    const p_franja = '5%'
    const h_franja = '75vh'
    const icon_box = '120px'
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            console.log('hay user', user)
            navigate('calendar')
        }
      },[])


    return(
        <Flex direction='column' w='100%' >

            <Flex bg='white' height='8vh' w='100%' p='1%' align='center'>
                <Flex w='50%' justify='start' ml='3%'>
                    <Flex><Text variant='parrafo'>another</Text><Text variant='parrafo' color={'blue'}>tool</Text></Flex>
                </Flex>
                <Flex w='50%' justify='end' gap='10' align='center' mr='3%' >
                    <Button variant='primary-out-s' 
                    onClick={() => navigate('login')}
                    >Iniciar sesión</Button>
                    <Button variant='primary-s'  
                    onClick={() => navigate('register')}
                    >Pruébalo gratis</Button>
                </Flex>
            </Flex>

            <Flex bg='white' w='100%'  p={p_franja} > 
                <Flex direction='column' w={['100%','100%','100%','100%','70%']} ml='5%' >
                    <Flex justifyContent={['center','center','center','space-between','start']}>
                        <Box>
                            <Flex><Heading variant='h1'>another</Heading><Heading variant='h1' color={'orange'}>day</Heading></Flex>
                            <Flex><Heading variant='h1'>another</Heading><Heading variant='h1' color={'blue'}>tool</Heading></Flex>
                        </Box>
                        <Box display={['none','none','none','block','none']}>
                            <Image h='100%' w='xs' src={img1}/>
                        </Box> 
                    </Flex>
                    <Heading my='3%' variant='h2' >Software de gestión para tu taller mecánico</Heading>
                    <Text variant='parrafo' my='4%' >Administra tu taller online de manera muy intuitiva y sencilla</Text>
                    <Flex>
                        <Button variant='primary-s' size='sm' 
                        onClick={() => navigate('register')}
                        >Pruébalo gratis</Button>
                    </Flex>
                </Flex>
                <Flex alignItems='center' display={['none','none','none','none','flex']}>
                    <Box p='5%'>
                        <Image src={img1}/>
                    </Box>   
                </Flex>
            </Flex>

            <Flex bg='lightgray' w='100%'  direction='column' align='center' p={p_franja}>
                <Heading variant='h2' justifyContent='center' >Un software eficiente y organizado</Heading>
                <Image src={img2}/>        
                <Text variant='parrafo' w={['100%','100%','90%','90%','75%',]} textAlign='center' mt='3%' >
                    No pierdas más el tiempo con programas liosos, llenos de pestañas con funciones inservibles.
                    anothertool quiere facilitarte el trabajo con un diseño intuitivo y actual.
                </Text>
            </Flex>

            <Flex bg='white' w='100%' p={p_franja} align='center' >
                <Flex w='50%'>
                    <Image src={img3}/>  
                </Flex>
                <Flex w='50%' direction='column' gap='3'>
                    <Flex>
                        <Text variant='parrafo'>Prioriza la experiencia del usuario</Text>
                    </Flex>
                    <Flex>
                        <Text variant='parrafo'>Fácil e intuitivo</Text>
                    </Flex>
                    <Flex>
                        <Text variant='parrafo'>Loremipsum loremipsum</Text>
                    </Flex>
                    <Flex>
                        <Text variant='parrafo'>Singelmery singelflery</Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex bg='lightgray' w='100%' direction='column' align='center' p={p_franja}>
                <Heading variant='h2' mx='5%'>anothertool, tu otra herramienta online</Heading>      
                <Text variant='parrafo' mx='5%'>Calendario, seguimiento de trabajos, historial de cliente,s gestión de citas, tareas y servicios
                    estadísticas... 
                </Text>
                <Flex direction={['column','column','column','row','row']} gap='10' mt='5%' >
                    <Flex gap='10'>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <AiOutlineCalendar className='svg-blue' size='50%' />
                        </Flex>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <AiOutlineUnorderedList className='svg-orange' size='50%' />
                        </Flex>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <MdOutlinePeopleAlt className='svg-darkblue' size='50%' />
                        </Flex>
                    </Flex>
                    <Flex gap='10'>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <RiBookletLine className='svg-blue' size='50%' />
                        </Flex>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <VscGraph className='svg-orange' size='50%' />
                        </Flex>
                        <Flex bg='white' w={icon_box} h={icon_box} rounded='xl' align='center' justify= 'center'>
                            <FiTool size='50%' className='svg-darkblue'/>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Flex bg='white' w='100%' direction={['column','column','column','column','row']}  p={p_franja}>
                <Flex w={['100%','100%','100%','100%','70%']} ml='5%' direction='column' gap='4' >
                    <Heading variant='h1'>Personalizado a medida para tu negocio</Heading>      
                    <Text variant='parrafo'>
                        Estamos muy comprometidos con el mundo del taller,
                        estando al día de las necesidades de nuestros clientes,
                        actualiándonos día a día.
                    </Text>
                </Flex> 
                <Flex alignItems='center' justifyContent='center'>
                    <Box p='5%' w={['70%','60%','50%','40%','100%']}>
                        <Image src={img5}/>
                    </Box>   
                </Flex>
            </Flex>

        </Flex>
    )
}