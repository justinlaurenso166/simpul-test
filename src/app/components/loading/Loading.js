import { ClipLoader } from "react-spinners";

export default function Loading({ loading, text }) {
    return (
        <>
            <div className="flex flex-col gap-4 h-full justify-center items-center">
                <ClipLoader
                    loading={loading}
                    size={35}
                    color="#C4C4C4"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    speedMultiplier={0.5}
                />
                <p className="text-primary-gray-dark font-semibold">
                    {text}
                </p>
            </div>
        </>
    )
}