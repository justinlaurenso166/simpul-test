"use client"

import { Button } from "@nextui-org/react";
import { useAtom } from "jotai";
import Image from "next/image";
import { loadingData, modalType } from "../store/store";

export default function TaskButton() {
    const [type, setType] = useAtom(modalType);
    const [, setLoading] = useAtom(loadingData);

    const clickTask = () => {
        setType('task');
        setLoading(true);
        setTimeout(() => { setLoading(false) }, 2000);

        // if (!dummyChats || dummyChats.length === 0) {
        //     setDummyChats(chats);
        // }
    }

    return (
        <>
            <div className="relative flex flex-col items-center">
                {
                    type == "" &&
                    <p className="absolute top-[-32px] font-medium text-center text-light">
                        Task
                    </p>
                }
                <Button
                    isIconOnly
                    disableAnimation={true}
                    className="bg-light rounded-full w-[52px] h-[52px] p-1 flex shadow-lightShadow"
                    onClick={() => {
                        clickTask()
                    }}
                >
                    <Image
                        src={'/icon/Group 1662.svg'}
                        width={27}
                        height={27}
                        className="text-white"
                        alt="task"
                    />
                </Button>
            </div>
        </>
    );
}
