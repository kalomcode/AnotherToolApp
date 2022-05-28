import React, {useState, useRef} from 'react'
import {Popover,PopoverTrigger,PopoverContent, PopoverHeader, PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton, useDisclosure, ButtonGroup} from '@chakra-ui/react'
import {Button} from '@chakra-ui/react'

export default function PopoverDelete({onDelete, id}){

    const initialFocusRef = React.useRef()
    const {isOpen, onOpen, onClose, onCancel } = useDisclosure()

    return(
        <>
        <Popover onClose={onClose} initialFocusRef={initialFocusRef}>
        {({ onClose }) => (
            <>
            <PopoverTrigger>
                <Button colorScheme='red' size='xs' type="button">X</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>Seguro que quieres borrarlo?</PopoverBody>
                <PopoverFooter border='0' d='flex' alignItems='center' justifyContent='flex-end' pb={4}>
                <ButtonGroup>
                <Button variant='outline' size='sm' colorScheme='orange' onClick={onClose} > Cancelar </Button>
                <Button variant='ghost' size='sm' colorScheme='red' ref={initialFocusRef} onClick={() => onDelete(id)}>
                Sí
                </Button>
                </ButtonGroup>                        
                </PopoverFooter>
            </PopoverContent>
            </>
            )}
        </Popover>
        </>
    )
}