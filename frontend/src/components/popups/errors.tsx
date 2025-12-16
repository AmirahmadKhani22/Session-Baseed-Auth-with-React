import {createPortal} from "react-dom"

type Props = {
    parent?: HTMLElement;
    title: string;
    message: string;
}

let popupsCount = 0

function PopupsErrors({parent , title , message}: Props) {
    popupsCount++

    return (
        <>{
            createPortal(
                (
                    <div className="overflow-hidden px-3 py-3 bg-white rounded-xl border border-gray-300 shadow-lg absolute top-8 right-8 z-50">
                        <div className="flex items-center gap-x-4 px-1 pb-4 border-b-2 border-b-red-950">
                            <div className="bg-red-500 size-8 rounded-full"></div>
                            <h4 className="font-bold text-2xl">{title}</h4>
                        </div>
                        <div className="pt-1">
                            <p className="text-xl">{message}</p>
                        </div>
                    </div>
                ),
                parent ?? document.body,
                `popups-success-${popupsCount}`
            )
        }</>
    )
}

export default PopupsErrors
