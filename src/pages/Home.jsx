import { useEffect, useMemo, useState } from 'react'
import { isValidHttpUrl } from '../utils/url.js'
import { saveMapping, codeExists, getBaseHost } from '../utils/storage.js'

export default function Home() {
    const [longUrl, setLongUrl] = useState('')
    const [code, setCode] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [error, setError] = useState('')

    const base = useMemo(() => getBaseHost(), [])

    useEffect(() => {
        setShortUrl('')
        setError('')
    }, [longUrl, code])

    const handleShorten = (e) => {
        e.preventDefault()
        if (!isValidHttpUrl(longUrl)) {
            setError('Please enter a valid URL (http or https)')
            return
        }
        const clean = (code || '').trim()
        if (!clean) {
            setError('Please enter a short code.')
            return
        }
        if (!/^[a-zA-Z0-9-_]{3,32}$/.test(clean)) {
            setError('Short code must be 3–32 characters (letters, numbers, -, _).')
            return
        }
        if (codeExists(clean)) {
            setError(`"${clean}" is already taken.`)
            return
        }
        saveMapping(clean, longUrl)
        setShortUrl(`${base}/${clean}`)
    }

    return (
        <section>
            <h1 className="title">Link Shrinker</h1>

            <form onSubmit={handleShorten} className="card">
                <label className="label">Long URL:</label>
                <input
                    className="input"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://example.com/very/long/url"
                />

                <label className="label">Enter short code:</label>
                <input
                    className="input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. react101"
                />

                <button className="btn" type="submit">Shorten</button>
                {error && <p className="error">{error}</p>}
            </form>

            <div className="card">
                <h2 className="subtitle">Short URL</h2>
                <div className="short-box">
                    {shortUrl ? (
                        <a href={shortUrl} target="_blank" rel="noreferrer" className="short-link">
                            {shortUrl}
                        </a>
                    ) : (
                        <span className="muted">Your short link will appear here.</span>
                    )}
                </div>
            </div>
        </section>
    )
}
