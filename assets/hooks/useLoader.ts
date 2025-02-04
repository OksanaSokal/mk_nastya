import {useRouter} from 'next/router';
import  NProgress from 'nprogress';
import {useEffect} from 'react';


export const useLoader = () =>{

    const router = useRouter() //этот хук дает нам доступ к объекту роута

    useEffect(()=>{
        const startLoading = () => NProgress.start() //ф-ция, которая включает прогрусс бар
        const endLoading = () => NProgress.done()// выключает прогресс бар

        router.events.on('routeChangeStart', startLoading) //это подписка на событие, когда начинает меняться наш роут
        router.events.on('routeChangeComplete', endLoading) //подписка на событие, когда роут перестал меняться
        router.events.on('routeChangeError', endLoading)

        return () =>{
            router.events.off('routeChangeStart', startLoading) //это отписка от события, когда начинает меняться наш роут
            router.events.off('routeChangeComplete', endLoading) //отписка от события, когда роут перестал меняться
            router.events.off('routeChangeError', endLoading)
        }
    }, [router])
}