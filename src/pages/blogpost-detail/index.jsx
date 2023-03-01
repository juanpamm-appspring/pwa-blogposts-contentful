import React from "react"
import PropTypes from 'prop-types'
import { getBlogPost } from "../../contentful-manager/contentful-fetch"
import {
    Box,
    Stack,
    Heading,
    Text,
    Image
} from "@chakra-ui/react"

const BlogpostDetail = ({ blogPost }) => {
    if (!blogPost) {
        return <Box>Loading...</Box>
    }

    return (
        <Box marginBottom={'50px'}>
            <Stack marginTop={'50px'} align={'center'}>
                <Heading
                    as="h1"
                >
                    {blogPost.title}
                </Heading>
                <Text>By {blogPost.author}</Text>
                <Text fontSize={14} fontStyle={'italic'}>Published on {blogPost.createdAt}</Text>
                <Box width={'50%'}>
                    <Image
                        src={`https:${blogPost.postImage.url}`}
                        alt={blogPost.postImage.title}
                        width={'100%'}
                        height={'100%'}
                    />
                </Box>
                <Box width={'60%'}>
                    <Text fontSize={20}>{blogPost.description}</Text>
                </Box>
            </Stack>
        </Box>
    )
}
BlogpostDetail.getProps = async ({ params }) => {
    const blogPost = await getBlogPost(params.blogpostId)

    return { blogPost }
}
BlogpostDetail.getTemplateName = () => 'blogpost-detail'

BlogpostDetail.propTypes = {
    blogPost: PropTypes.object
}

export default BlogpostDetail
