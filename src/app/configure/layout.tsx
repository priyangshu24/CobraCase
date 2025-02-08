import { ReactNode } from "react";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
import Steps from "@/components/ui/Steps";

const Layout = ({children}: {children: ReactNode}) => {
    return <MaxWidthWrapper className="flex-1 flex flex-col h-full">
        <Steps/>
        {children}
        </MaxWidthWrapper>
}
export default Layout