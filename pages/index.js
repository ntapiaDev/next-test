import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCount(n => n + 1), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <p>{count}</p>
      <ul>
        {posts.map(post => <li key={post.id}>
          <h3>{post.title}</h3>
          <a href={`blog/${post.id}`}>Aller au post {post.id}</a>
        </li>)}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
    .then(r => r.json())
  return {
    props: {
      posts
    }
  }
}