type Props = {
    label: string,
    value: string
}

export function InfoItem({label, value}: Props) {
    return(

        <div className="flex flex-col items-center">
            <div className="text-slate-500 font-bold">{label}</div>
            <div className="text-[40px] font-bold dark:text-slate-50">{value}</div>
        </div>

    );
}