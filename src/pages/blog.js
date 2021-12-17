import react, { useEffect, useState } from 'react'
import { post } from '../../../server/routes/auth'

export default function Posts() {
    const [posts, setPosts] = useState([])
    const history = useHistory()
    const { token } = useToken()

    useEffect(() => {
        const getPosts = async adminEmail => {
            const posts = await API.getAllPosts(token)
        }
    }, [])

    return (
        <div>
            {posts.map(post => (
                <p key={post._id}>{ post.title}</p>
            ))}
        </div>
    )
}