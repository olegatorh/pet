'use client';

import { ImGoogle, ImFacebook } from 'react-icons/im';
import { continueWithGoogle, continueWithFacebook } from '@/utils';
import { SocialButton } from '@/components/common';


export default function SocialButtons() {
	return (
		<div className='flex justify-between items-center gap-2 mt-5'>
			<SocialButton provider='google' onClick={continueWithGoogle}>
				<ImGoogle className='mr-3' /> Google Signin
			</SocialButton>
			<SocialButton provider='facebook' onClick={continueWithFacebook}>
				<ImFacebook className='mr-3' /> Facebook Signin
			</SocialButton>
		</div>
	);
}