import '@styles/globals.css'

export const metadata = {
    title: "promptopia",
    description: "Discover and share Ai prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                {children }
            </main>
        </body>
    </html>
    )
}

export default RootLayout