import React, { useEffect, useState, useMemo } from 'react'
import {Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,DrawerContent,DrawerCloseButton, useDisclosure} from '@chakra-ui/react'
import {Box, Button,Input, InputGroup, InputLeftElement, Text, Textarea, Stack, Flex, Heading, Select, CloseButton} from '@chakra-ui/react'
import {FormControl, FormLabel, FormHelperText, FormErrormessage} from '@chakra-ui/react'
import moment from 'moment';
import SvgTime from  '../dist/Time'

export default function EventFormCrud({onClose, event, events, setEvents, servicelist, clientlist}) {

  const[title, setTitle] = useState()
  const[service, setService] = useState()
  const[client, setClient] = useState()
  const[price, setPrice] = useState()
  const[note, setNote] = useState()
  const[datein, setDatein] = useState()
  const[dateout, setDateout] = useState()

  useEffect(() => {
    if(event){
        setTitle(event.title)
        setService(event.service.id)
        setClient(event.client.id)
        setPrice(event.extraprice)
        setNote(event.note)
        setDatein(event.start)
        setDateout(event.end)
    }
    else{
    setTitle()
    setPrice()
    setClient()
    setNote()
    setDatein()
    setDateout()
    }
    }, [event]);

  const onChangePrice = (e) => {
      setPrice(e.target.value)
    };
  const onChangeNote = (e) => {
      setNote(e.target.value)
    };

  const createDate = async (e) => {
    e.preventDefault()
    const eventToCreate ={
            'start': datein,
            'end': dateout,
            'client': client,
            'service': service,
            'note': note,
            'title': title,
    }
    const response = await fetch('https://plabo.pythonanywhere.com/api/createdate',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventToCreate)
        })
    const data = await response.json();
    setEvents((events) => [...events, data]);
          
}
  const updateDate = async (e) => {
    e.preventDefault()
      const eventToUpdate ={
        'start': datein,
        'end': dateout,
        'client': client,
        'service': service,
        'note': note,
        'title': title,
      }
    const response = await fetch('https://plabo.pythonanywhere.com/api/'+event.id+'/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventToUpdate)
        })
        const data = await response.json();
        console.log(data)
        setEvents(events.filter(item => item.id!==event.id)); //deleteo el que he modificado para updatearlo
        setEvents((events) => [...events, data]); 
        onClose()
    }
  const deleteDate = async (e) => {
    e.preventDefault()
    console.log('Deleting', event.id)
    fetch('https://plabo.pythonanywhere.com/api/' + event.id, {method: 'DELETE'})
    .then(setEvents(events.filter(item => item.id!==event.id)))
    }

    // Event duration calculator
  function duration(){
    const d = moment.duration(moment(event.end).diff(moment(event.start)))
    const formated = (d.get('hours') + 'h ' + d.get('minutes') + 'min')
    return (<p>{formated}</p>)
  }
  return (
    <>
    <DrawerBody>
      <FormControl px='3' >
        <Stack spacing={4}>           
          <Input  my='3' variant='flushed' onChange={e => setTitle(e.target.value)} placeholder={event? event.title  : 'Título..'}/>
          <Select placeholder='Servicio' onChange={e => setService(e.target.value)} >
            {servicelist.map(service=>
                <option key={service.id} value={service.id}> {service.name} </option>
            )}
          </Select>
          <Select placeholder='Cliente' onChange={e => setClient(e.target.value)} >
              {clientlist.map(client=>
                  <option key={client.id} value={client.id}> {client.name} </option>
              )}
          </Select> 
          </Stack> 

          {event &&  
          <Flex direction='column' gap='2' my='6' >        
          <Flex align='center' justify='start' gap={3}> <SvgTime/>  <Text>{duration()}</Text> </Flex>                
          <Text> IN  {moment(event.start).format("DD/MM/YYYY, hh:mm")} </Text>
          <Text> OUT {moment(event.end).format("DD/MM/YYYY hh:mm")}</Text>
          </Flex>} 

          <Stack spacing={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='1.2em'
              children='€'
            />
            
            <Input onChange={onChangePrice} placeholder={event? event.extraprice: 'Precio extra?'} />
          </InputGroup>
          <Textarea onChange={onChangeNote} variant='filled' placeholder='Notas' /> 
          </Stack>
        </FormControl>
    </DrawerBody>
      <DrawerFooter>
        <Flex  justify="right" columnGap="3" my='3'>             
          {event?
              <>
                <Button colorScheme='red' size='sm'  onClick={deleteDate} >Delete</Button>
                <Button colorScheme='orange' size='sm' onClick={updateDate} >  Guardar </Button>
              </>: 
              <>
              <Button variant='ghost' colorScheme='red' size='sm'  onClick={onClose} >Cancel</Button>
              <Button colorScheme='orange' size='sm' onClick={createDate} >  Crear </Button>
              </>}
        </Flex> 
        </DrawerFooter>   
      </>
    )
}
