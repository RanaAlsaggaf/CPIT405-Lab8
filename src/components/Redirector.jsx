import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLongUrl } from '../utils/storage.js'

export default function Redirector() {
    const { code } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const url = getLongUrl(code)
        if (url) {
            window.location.replace(url)
        } else {
            setTimeout(() => navigate('/'), 1500)
        }
    }, [code, navigate])

    const url = getLongUrl(code)

    return (
        <div className="card">
            {url
                ? <p>Redirecting to <strong>{url}</strong>…</p>
                : <p>Short code <strong>{code}</strong> not found. Redirecting home…</p>}
        </div>
    )
}
