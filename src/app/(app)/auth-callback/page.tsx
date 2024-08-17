"use client";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isSuccess, error, isLoading } = api.user.sync.useQuery();

  useEffect(() => {
    if (isSuccess) {
        console.log("tf?");
          router.push(origin ? `/${origin}` : "/");
        
    }
  }, [data]);

  return (
    <div className='w-full mt-24 flex justify-center min-h-[30vh]'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Setting up your account...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
