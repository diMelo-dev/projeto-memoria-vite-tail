type Props = {
    label: string,
    icon?: any,
    onclick: React.MouseEventHandler<HTMLDivElement>
}

export function Button({label, icon,  onclick}: Props) {
    return(
        <div className="w-[150px] flex p-1 rounded-lg bg-sky-700 cursor-pointer hover:opacity-80" onClick={onclick}>
            {icon && 
                <div className='p-2 flex justify-center align-center border-r' >
                    <img src={icon} />
                </div>
            }
            <div className='p-2 flex-1 flex justify-center align-center text-white'>
                {label}
            </div>
        </div>
    );
}