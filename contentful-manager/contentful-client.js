const contentful = require('contentful')

const client = contentful.createClient({
    space: '',
    accessToken: '',
})

export default client