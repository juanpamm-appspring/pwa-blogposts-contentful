import React, { useEffect, useState } from "react"
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getBlogPosts } from "../../contentful-manager/contentful-fetch"
import { 
    Box,
    HStack,
    Image,
    Link,
    Select,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react"

const BlogpostList = () => {
    let history = useHistory()
    let { catName } = useParams()
    const [blogPosts, setBlogPosts] = useState([])
    const [filteredBlogPosts, setFilteredBlogPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const initializeCategories = (blogs) => {
        const categoriesArray = blogs.map(blog => {
            return blog.category.name
        })
        const uniqueCategories = categoriesArray.filter((cat, index) => categoriesArray.indexOf(cat) === index)
        setCategories(uniqueCategories)
    }

    useEffect(() => {
        const fetchBlogposts = async () => {
            const blogsRes = await getBlogPosts()
            
            setBlogPosts(blogsRes)
            initializeCategories(blogsRes)

            if (catName) {
                const filteredArray = blogsRes.filter(blog => {
                    return blog.category.name === catName
                })
                setFilteredBlogPosts(filteredArray)
            } else {
                setFilteredBlogPosts(blogsRes)
            }
        }

        fetchBlogposts()
    }, [])

    useEffect(() => {
        if (catName) {
            setSelectedCategory(catName)
        }
    }, [blogPosts])

    useEffect(() => {
        if (selectedCategory !== '') {
            history.push(`/blogpost-list/${selectedCategory}`)
            const filteredArray = blogPosts.filter(blog => {
                return blog.category.name === selectedCategory
            })
            setFilteredBlogPosts(filteredArray)
        } else {
            history.push(`/blogpost-list/`)
            setFilteredBlogPosts(blogPosts)
        }
    }, [selectedCategory])

    if (blogPosts.length === 0 && filteredBlogPosts.length === 0) {
        return <Box>Loading...</Box>
    }

    return (
        <Box>
            {categories && categories.length > 0 ? 
                <Select placeholder="Select an option" onChange={(e) => {setSelectedCategory(e.target.value)}}>
                    {categories.map((category, index) => {
                        return <option key={index} value={category}>{category}</option>
                    })}
                </Select>
                :
                null
            }
            <Stack>
                {filteredBlogPosts.map((blog, index) => {
                    return (
                        <Link 
                            key={index}
                            as={NavLink}
                            to={`/blogpost-detail/${blog.id}`}
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
