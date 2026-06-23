import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/react'

function App() {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <h1>PaoFit</h1>
                <Show when="signed-out">
                    <SignInButton />
                    <SignUpButton />
                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div>
        </>
    )
}

export default App
