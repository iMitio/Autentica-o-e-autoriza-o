import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {parseCookies} from "nookies";



export  function withSSRAuth<P>(fn: GetServerSideProps<P>) {
    return  async (value: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const  cookies  =  parseCookies(value)

        if(!cookies['nextauth.token']) {
            return {
            redirect: {
                destination: "/",
                permanent: false
            }
            }
    
        }
        return await fn(value)
    }
}