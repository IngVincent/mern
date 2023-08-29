import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

function RegisterPage() {
    const { register, handleSubmit, formState: { errors },
    } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks');
    }, [isAuthenticated])
    // console.log(user)

    const onSubmit = handleSubmit(async (values) => {

        signup(values)
    })

    return (
        <div className="bg-zin-800 max-w-md p-10 rounded-md">
            <h1 className="text-3xl font-bold">Register</h1>

            {RegisterErrors.map((errors, i) => (
                <div className="bg-red-500 p-2 text-white" key={i}>
                    {errors}
                </div>
            ))
            }
            <form onSubmit={onSubmit}
            >
                <input type="text" {...register('username', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Username"
                />
                {errors.username && (
                    <p className="text-red-500">Username is required</p>
                )}
                <input type="email"{...register('email', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="E-mail"
                />
                {errors.email && (
                    <p className="text-red-500">E-mail is required</p>
                )}
                <input type="password" {...register('password', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Password"
                />
                {errors.password && (
                    <p className="text-red-500">Password is required</p>
                )}
                <button type="submit">Register</button>
            </form>
            <p className='flex gap-x-2 justify-between'>
                Already have an account? <Link to='/login'
                    className='text-sky-500'>sign in</Link>
            </p>
        </div>
    )
}

export default RegisterPage
