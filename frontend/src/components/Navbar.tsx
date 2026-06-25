import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

export default function Navbar() {
    return (
        <nav className="border-b border-zinc-800 bg-zinc-950">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <h1 className="text-xl font-bold text-white">
                    PaoFit
                </h1>

                <div className='flex gap-4'>
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <button className="rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200">
                                Sign In
                            </button>
                        </SignInButton>
                        {/* Customized Sign Up Button */}
                        <SignUpButton mode="modal">
                            <button className="rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-3 text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800">
                                Get Started
                            </button>
                        </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                </div>
            </div>
        </nav>
    )
}
