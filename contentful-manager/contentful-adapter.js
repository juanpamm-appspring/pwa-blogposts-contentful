const adaptImage = (image) => {
    if (!image) {
        return {
            url: '',
            title: '',
            description: ''
        }
    }

    const { fields } = image

    return {
        url: fields?.file?.url,
        title: fields?.title,
        description: fields?.description
    }
}

export const adaptBlogPost = (data) => {
    const { sys, fields } = data

    return {
        id: sys.id,
        title: fields.title ? fields.title : null,
        description: fields.description ? fields.description : null,
        shortDescription: fields.shortDescription ? fields.shortDescription : null,
        author: fields.author ? fields.author : null,
        postImage: adaptImage(fields.postImage),
        createdAt: sys.createdAt ? sys.createdAt : null,
        updatedAt: sys.updatedAt ? sys.updatedAt : null
    }
}

export const adaptBlogPosts = (dataArray) => {
    if (dataArray && dataArray.length > 0) {
        return dataArray.map((data) => {
            return adaptBlogPost(data)
        })
    } else {
        return []
    }
}