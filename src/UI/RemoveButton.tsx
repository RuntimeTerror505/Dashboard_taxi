
const RemoveButton = ({style,onClick}:{
    style?:string;
    onClick: ()=> void;
}) => {
    const main ="flex bg-red-400 hover:bg-red-500 font-bold cursor-pointer active:bg-red-300 rounded-full text-white w-4 h-4 text-sm items-center justify-center"
    return (
        <div onClick={onClick} className={main+' '+ style}>-</div>
    );
};

export default RemoveButton;