
const AddButton = ({style, onClick}:{
    style?:string;
    onClick:()=>void;
}) => {
    const main ="flex  font-bold cursor-pointer  active:bg-green-200 rounded-full bg-green-400 text-sm border border-black w-4 h-4 items-center justify-center"
    return (
        <div onClick={onClick} className={main+ ' ' + style}>+</div>
    );
};

export default AddButton;