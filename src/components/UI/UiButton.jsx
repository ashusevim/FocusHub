function UiButton({text, handler}){
    return (
        <>
            <button 
                onClick={handler}
                className="px-2 py-2 border rounded-md font-medium transition-colors flex items-center bg-slate-900 text-white hover:cursor-pointer
            justify-center w-24">
                {text}
            </button>
        </>
    )
}

export default UiButton;