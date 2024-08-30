"use client"

import { Button } from "@nextui-org/react";
import { useAtom } from "jotai";
import Image from "next/image";
import { modalType, showButton } from "../store/store";
import { RESET } from "jotai/utils";

export default function QuickButton({ type, onClose }) {
    const [showButtons, setShowButtons] = useAtom(showButton);
    const [, setType] = useAtom(modalType);

    const toggleButtons = () => {
        setShowButtons(!showButtons);
    };

    const closeAll = () => {
        setType(RESET);
        setShowButtons(RESET);
        onClose();
    }

    return (
        <div>
            {
                type === '' ?
                    <Button
                        isIconOnly
                        disableAnimation={true}
                        className="bg-primary-blue rounded-full w-[60px] h-[60px] p-1 shadow-lightShadow"
                        onClick={toggleButtons}
                    >
                        <Image
                            src={'/icon/cloud-lightning.svg'}
                            width={80}
                            height={80}
                            className="text-white"
                            alt="quick"
                            priority
                        />
                    </Button>
                    :
                    <div className="relative mr-3">
                        {/* Background */}
                        <Button
                            isIconOnly
                            disableAnimation={true}
                            className="bg-primary-gray-dark rounded-full w-[60px] h-[60px] p-1 shadow-lightShadow z-10"
                            onClick={closeAll}
                        >
                        </Button>

                        <Button
                            isIconOnly
                            disableAnimation={true}
                            className={`absolute left-4 ${type === 'task' ? 'bg-indicator-orange' : 'bg-indicator-purple'} rounded-full w-[60px] h-[60px] p-1 shadow-lightShadow z-20`}
                        // onClick={toggleButtons}
                        >
                            <Image
                                src={type === 'task' ? '/icon/Group 1907.svg' : '/icon/Group 1908.svg'}
                                width={30}
                                height={30}
                                className="text-white"
                                alt="quick"
                                priority
                            />
                        </Button>
                    </div>
            }
        </div>
    )
}
