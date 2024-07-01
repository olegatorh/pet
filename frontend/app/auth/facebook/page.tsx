'use client';

import {useSocialAuthenticateMutation} from "@/redux/features/authApiSlice";
import {useSocialAuth} from "@/hooks";
import {Spinner} from "@/components/common";

export default function Page(){
    const [facebookAuthenticate] = useSocialAuthenticateMutation()
	useSocialAuth(facebookAuthenticate, 'facebook');
    return(
        <div>
            <Spinner lg/>
        </div>
    )
}