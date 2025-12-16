import {createPortal} from "react-dom"

type Props = {
    parent?: HTMLElement;
    title: string;
    message: string;
}

let popupsCount = 0

function PopupsSuccesses({parent , title , message}: Props) {
    popupsCount++

    return (
        <>{
            createPortal(
                (
                    <div className="overflow-hidden px-4 py-4 bg-white rounded-xl border border-gray-400 shadow-lg absolute top-8 right-8 z-50">
                        <div className="flex items-center gap-y-4 pb-4 border-b-2 border-b-green-950">
                            <div className="bg-green-500 size-8 rounded-full"></div>
                            <h4 className="font-bold text-2xl">{title}</h4>
                        </div>
                        <div className="pt-4">
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

export default PopupsSuccesses
