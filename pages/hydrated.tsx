import { App } from "antd"
import { FC, useState, useEffect } from "react"
import WithToken from "../hocs/withAuth"


const Hydrated: FC<any> = () => {
    const [hydrated, setHydrated] = useState(false)
    useEffect(() => {
        if (!hydrated) {
            setHydrated(true)
        }
    }, [])


    return (
        <>
            {hydrated ? <Index /> : null}
        </>
    )

}

export default WithToken(Hydrated);