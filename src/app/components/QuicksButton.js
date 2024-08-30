"use client"

import { useAtom } from "jotai";
import { modalType, showButton } from "../store/store";
import InboxButton from "./InboxButton";
import QuickButton from "./QuickButton";
import TaskButton from "./TaskButton";

export default function QuicksButton({onClose}) {
    const [showButtons] = useAtom(showButton);
    const [type] = useAtom(modalType);

    return (
        <div className="relative flex gap-5 items-center">

            {/* TaskButton */}
            {
                type !== 'task' &&
                <div
                    className={`${
                        showButtons ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%]'
                    }`}
                >
                    <TaskButton />
                </div>
            }
            {/* End TaskButton */}

            {/* InboxButton */}
            {
                type !== 'inbox' &&
                <div
                    className={`${
                        showButtons ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%]'
                    }`}
                >
                    <InboxButton />
                </div>
            }
            {/* End InboxButton */}

            {/* QuickButton */}
            <QuickButton type={type} onClose={onClose} />
        </div>
    );
}
