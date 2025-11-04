import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLongUrl } from '../utils/storage.js'

export default function Redirector() {
  const { code } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const url = getLongUrl(code)
    if (url) {
      window.location.href = url
    } else {
      setTimeout(() => navigate('/'), 2000)
    }
  }, [code, navigate])

  return (
    <div className="card">
      <p>Redirecting... please wait.</p>
    </div>
  )
}

