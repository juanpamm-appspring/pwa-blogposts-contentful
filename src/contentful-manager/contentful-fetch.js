import client from './contentful-client'
import { adaptBlogPost, adaptBlogPosts } from './contentful-adapter'

export const getBlogPosts = async () => {
    const blogPostEntries = await client.getEntries({
        content_type: 'blogPost'
    })
    const blogPosts = adaptBlogPosts(blogPostEntries.items)
    
    return blogPosts
}

export const getBlogPost = async (blogPostId) => {
    const blogPostEntry = await client.getEntry(blogPostId)
    const blogPost = adaptBlogPost(blogPostEntry)
    
    return blogPost
}