import React from "react"
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { getBlogPosts } from "../../contentful-manager/contentful-fetch"
import { 
    Box, 
    Stack, 
    Text, 
    HStack, 
    VStack,
    Image,
    Link
} from "@chakra-ui/react"

const BlogpostList = ({ blogPosts }) => {
    if (!blogPosts) {
        return <Box>Loading...</Box>
    }

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
BlogpostList.getProps = async () => {
    const blogPosts = await getBlogPosts()
    return { blogPosts }
}
BlogpostList.getTemplateName = () => 'blogpost-list'

BlogpostList.propTypes = {
    blogPosts: PropTypes.array
}

export default BlogpostList
