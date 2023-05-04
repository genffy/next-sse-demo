"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export type MenuType = Array<{ name: string; callFn?: Function }>;
export const menus: MenuType = [
    {
        name: "fetchData",
        // callFn: fetchData,
    },
    {
        name: "runEventSource",
        // callFn: runEventSource,
    },
    {
        name: "simpleFetch",
        // callFn: simpleFetch,
    },
    {
        name: "streamFetch",
        // callFn: streamFetch,
    },
    {
        name: "getChunk",
        // callFn: getChunk,
    }
]
export function Header() {
    const [hashUrl, setHashUrl] = useState<string>('');
    useEffect(() => {
        setHashUrl(location.hash);
    }, [])
    const pathName = usePathname();

    useEffect(() => {
        if (pathName) {
            setHashUrl(pathName)
        }
    }, [pathName]);
    return <header className="mb-5">
        <ul className="flex items-center justify-center w-full">
            {
                menus.map(item => {
                    const _hashUrl = `/sse/${item.name}`
                    return <li className={`mx-5 px-5 hover:bg-red-400 cursor-pointer hover:text-white ${_hashUrl === hashUrl ? 'bg-red-400 text-white' : ''} `} key={item.name} ><Link href={_hashUrl}>
                        {item.name}
                    </Link></li>
                })
            }
        </ul>
    </header>
}
