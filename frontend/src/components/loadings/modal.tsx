function ModalLoading() {
    return (
        <div className="w-screen h-screen overflow-hidden absolute inset-0 z-40">
            <div className="w-full h-full overflow-auto bg-[rgba(0,0,0,0.45)] flex items-center justify-center py-8 px6">
                <div className="m-auto p-4 bg-white rounded-xl">

                    <p className="font-bold text-center text-2xl text-gray-700">Is Loading ...</p>
                </div>
            </div>
        </div>
    )
}

export default ModalLoading