import {useState, ChangeEvent, FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {useRegisterMutation} from '@/redux/features/authApiSlice';
import {toast} from 'react-toastify';

export default function useRegister() {
    const router = useRouter();
    const [register, {isLoading}] = useRegisterMutation();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const {first_name, last_name, email, password, re_password} = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormData({...formData, [name]: value});
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        register({first_name, last_name, email, password, re_password})
            .unwrap()
            .then((response) => {
                console.log('Response:', response); // Log the response
                toast.success('Please check email to verify account');
                router.push('/auth/login');
            })
            .catch(() => {
                toast.error('Failed to register account');
            }).finally(() => {
            console.log('Request completed'); // This will be executed whether the request succeeds or fails
        });
    };

    return {
        first_name,
        last_name,
        email,
        password,
        re_password,
        isLoading,
        onChange,
        onSubmit,
    };
}