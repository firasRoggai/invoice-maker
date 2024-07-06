"use client";

import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";

const Page = () => {
    const [num, setNum] = useState(0)

    const post = () => {
        console.log("The funtion ran this time");
        const result = 1000 + num;
        console.log(result);
    }

    const handleSubmit = useCallback(post, [num]);

    return (
        <div className="min-h-screen">
            <Button onClick={() => { handleSubmit() }}>
                click
            </Button>
            
            <Button onClick={() => { setNum(num + 1) }}>
                +
            </Button>
        </div>
    );
}

export default Page;