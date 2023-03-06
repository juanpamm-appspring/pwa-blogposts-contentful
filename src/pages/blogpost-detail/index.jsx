import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import { getBlogPost } from "../../contentful-manager/contentful-fetch"
import {
    Box,
    Stack,
    Heading,
    Text,
    Image
} from "@chakra-ui/react"

const BlogpostDetail = () => {
    const { blogpostId } = useParams()
    const [blogPostDetail, setBlogPostDetail] = useState()

    useEffect(() => {
        if (blogpostId) {
            const fetchBlogpostDetail = async () => {
                const blogRes = await getBlogPost(blogpostId)
                setBlogPostDetail(blogRes)
            }
    
            fetchBlogpostDetail()
        }
    }, [blogpostId])

    if (!blogPostDetail) {
        return <Box>Loading...</Box>
    }

    return (
        <Box marginBottom={'50px'}>
            <Stack marginTop={'50px'} align={'center'}>
                <Heading
                    as="h1"
                >
                    {blogPostDetail.title}
                </Heading>
                <Text>By {blogPostDetail.author}</Text>
                <Text fontSize={14} fontStyle={'italic'}>Published on {blogPostDetail.createdAt}</Text>
                <Box width={'50%'}>
                    <Image
                        src={`https:${blogPostDetail.postImage.url}`}
                        alt={blogPostDetail.postImage.title}
                        width={'100%'}
                        height={'100%'}
                    />
                </Box>
                <Box width={'60%'}>
                    <Text fontSize={20}>{blogPostDetail.description}</Text>
                </Box>
            </Stack>
        </Box>
    )
}

export default BlogpostDetail
