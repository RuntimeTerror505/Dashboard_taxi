// import { LiaBabyCarriageSolid } from "react-icons/lia";
import { useMain } from '../../../../Store/useMain';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import babiSeat from './../../../../assets/babySeat.png'
import regularBaby from './../../../../assets/BabiSeat2.png'
import stroller from './../../../../assets/stroller.png'
import baby from './../../../../assets/baby.png'
import booster from './../../../../assets/booster.png'
import umbrella from './../../../../assets/umbrellaStroller.png'
import double from './../../../../assets/doubleStroller.png'
import wheelchair from './../../../../assets/wheelchair.png'


const CarSeatsSelect = () => {
    const {list, activeCarId, setCarSeats} = useMain()

    return (
        <div className={container}>
        
        <div className={part}>

            <div className={card} key={list[activeCarId-1].carSeats[0].title}>
                <div style={{backgroundImage:`url(${regularBaby})` }} className={'w-5 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>
                <div className={labelText}>
                    <span className={text}> {list[activeCarId-1].carSeats[0].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[0].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[0].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[0].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[0].quantity <= 0 ) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[0].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        />
                    </div>
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[1].title}>
                <div style={{backgroundImage:`url(${baby})` }} className={'w-5 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>

                <div className={labelText}>
                    <span className={text}> {list[activeCarId-1].carSeats[1].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[1].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[1].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[1].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[1].quantity <= 0 ) return
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[1].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                        />
                    </div>
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[2].title}>
                <div style={{backgroundImage:`url(${booster})` }} className={'w-5 h-4 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>

                <div className={labelText}>
                    <span className={text}> {list[activeCarId-1].carSeats[2].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[2].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[2].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[2].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[2].quantity <= 0 ) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[2].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        />
                    </div>
                </div>
            </div>

            <div className='absolute border-none  -top-4 right-1/2 translate-x-1/2 bg-white px-1'>
                <div style={{backgroundImage:`url(${babiSeat})` }} className={' bg-white  text-xs w-6 bg-center h-5 bg-contain bg-no-repeat'} ></div>
            </div>

        </div>

        <div className={part}>

            <div className={card} key={list[activeCarId-1].carSeats[3].title}>
                <div style={{backgroundImage:`url(${stroller})` }} className={'w-5 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>

                <div className={labelText}>
                    <span className={text}> {list[activeCarId-1].carSeats[3].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[3].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[3].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[3].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[3].quantity <= 0 ) return 
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[3].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        />
                    </div>
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[4].title}>
                <div style={{backgroundImage:`url(${umbrella})` }} className={'w-5 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>
                <div className={labelText}>
                    <span className={text}> {list[activeCarId-1].carSeats[4].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[4].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[4].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[4].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[4].quantity <= 0 ) return ;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[4].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}  
                        />
                    </div>
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[5].title}>
                <div style={{backgroundImage:`url(${double})` }} className={'w-4 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>
            
                <div className={labelText}>
                    <span className={text}> {list[activeCarId-1].carSeats[5].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[5].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[5].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[5].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[5].quantity <= 0 ) return 
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[5].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        />
                    </div>
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[6].title}>
                <div style={{backgroundImage:`url(${wheelchair})` }} className={'w-4 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>

                <div className={labelText}>
                    <span className={'text-gray-400 '}> {list[activeCarId-1].carSeats[6].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-5'>{list[activeCarId-1].carSeats[6].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[6].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[6].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[6].quantity <= 0 ) return 
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[6].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                        />
                    </div>
                </div>
            </div>

            <div className='absolute -top-4 right-1/2 translate-x-1/2  border-none bg-white px-1'>
                <div style={{backgroundImage:`url(${stroller})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
            </div>

        </div>

        </div>
    );
};

export default CarSeatsSelect;

const labelText = 'flex items-center w-[50%]'
const text = ' text-gray-400  truncate'

const part = 'relative flex px-2 flex-col w-1/2 pt-2 border border-blue-500 rounded divide-y'
const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%]  duration-300 "
const bagCount ='flex space-x-1 ml-auto items-center'
// const babiSeatIcon ='w-4 h-4 mx-1 overflow-hidden bg-contain bg-no-repeat bg-[url("https://cdn1.iconfinder.com/data/icons/car-engine-dashboard-lights-outline-set-2/91/Car_Engine_-_Dashboard_Lights_73-512.png")] scale-[130%]'

const card = 'relative flex  pr-4 py-2 cursor-pointer w-full text-sm max-h-[45px] border-blue-500'
const container = 'flex w-full items-start space-x-1'

