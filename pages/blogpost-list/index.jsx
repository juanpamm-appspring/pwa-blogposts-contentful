import React from "react"
import { NavLink } from 'react-router-dom'
import { 
    Box, 
    Stack, 
    Text, 
    HStack, 
    VStack,
    Image,
    Link
} from "@chakra-ui/react"

const BlogpostList = (blogPosts) => {

    return (
        <Box>
            <Stack>
                {blogPosts.map((blog, index) => {
                    return (
                        <Link 
                            key={index}
                            as={NavLink}
                            to={`blogpost-detail/${blog.id}`}
                        >
                            <Box>
                                <HStack>
                                    <Box>
                                        <Image 
                                            src={`https:${blog.postImage.url}`} 
                                            alt={blog.postImage.title}
                                            width={'150px'}
                                            height={'100px'}
                                        />
                                    </Box>
                                    <VStack width={'50%'}>
                                        <Box>
                                            <Text fontWeight={'700'} textAlign={'center'}>{blog.title}</Text>
                                        </Box>
                                        <Box>
                                            <Text textAlign={'left'}>{blog.shortDescription}</Text>
                                        </Box>
                                    </VStack>
                                </HStack>                            
                            </Box>
                        </Link>
                    )
                })}
            </Stack>
        </Box>
    )
}

export default BlogpostList
