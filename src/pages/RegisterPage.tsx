import RegisterForm from '@/components/RegisterForm'
import { Toaster } from 'react-hot-toast'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <RegisterForm />
      <Toaster position="bottom-center" />
    </div>
  )
}
