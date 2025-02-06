import { ReactNode } from "react";
import MaxWidthWrapper from "../component/MaxWidthWrapper";
const Layout = ({children}: {children: ReactNode}) => {
    return <MaxWidthWrapper className="flex-1 flex flex-col h-full">{children}</MaxWidthWrapper>
}
export default Layout