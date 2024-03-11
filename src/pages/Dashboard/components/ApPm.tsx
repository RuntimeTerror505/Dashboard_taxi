
const ApPm = ({type, title, setOrder }:{ type:number,title:string, setOrder: (data: number, title:string)=>void;}) => {
    
    return (
        <div className={type === 1 ? timeToggle + ' bg-gray-600 ' : timeToggle}>
            <div className={type === 1 ? amTextActive : amText} onClick={() => setOrder(1,title)}>am</div>
            <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
            <div className={type === 2 ? pmTextActive : pmText} onClick={() => setOrder(2,title)}>PM</div>
        </div>
    );
};

export default ApPm;

const pmText = 'px-2 pl-4 rounded-tl triangle flex bg-white items-center py-1 '
const pmTextActive = 'px-2 pl-4 text-white bg-gray-600  rounded-tl triangle flex items-center py-1 '
const amText = 'pl-2  flex items-center py-1 pr-[2px] '
const amTextActive = 'pl-2  flex items-center py-1 pr-[2px] bg-gray-600 text-white '
const timeToggle = 'relative font-bold self-end mb-1 flex  items-center text-xs  cursor-pointer  rounded overflow-hidden border border-black '
