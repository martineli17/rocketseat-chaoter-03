import { NextRouter } from "next/router";
import { useEffect, useState } from "react";

export function useLoadingRouter(router: NextRouter){
    const [pageLoading, setPageLoading] = useState<boolean>(false);

    useEffect(() => {
      const handleStart = () => { setPageLoading(true); };
      const handleComplete = () => { setPageLoading(false); };
  
      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
    }, [router]);
    
    return {loading: pageLoading};
}