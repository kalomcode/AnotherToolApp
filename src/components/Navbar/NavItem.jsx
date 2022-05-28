import {Flex, Text, IconButton, Menu, Link, MenuButton, } from '@chakra-ui/react'
import { Link as ReachLink, useMatch, useResolvedPath } from 'react-router-dom';

function NavItem({navSize, icon, title, slash}){
    let resolved = useResolvedPath(slash);
    let active = useMatch({ path: resolved.pathname, end: true });
    return(
    <Flex
        mt={30}
        direction = "column"
        w="100%"
        align={navSize === "small"? "center": "flex-start"}
    >
        <Menu>
            <Link
            backgroundColor={active && "blue"}
            p="3"
            borderRadius={8}
            _hover={{textDecor: 'none', backgroundColor:"blue", color:"white"}}
            w={navSize === "large" && "100%"}
            as={ReachLink}
            to={slash}
            
            >
                <MenuButton w="100%">
                    <Flex>
                        <IconButton as={icon} bg='none' size='xs' color={active ? "white": "orange" }  className='svg-white' />
                        <Text display={navSize === "small"? "none": "flex"} ml="5" color="whiteAlpha.800" > {title} </Text>
                    </Flex>
                </MenuButton>
            </Link>
        </Menu>
    </Flex>

    )
}

export default NavItem;