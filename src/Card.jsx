import { useCallback, useEffect, useState, useRef } from "react";
const Card = () => {
    const [length, setLength] = useState(8);
    const [num, setNum] = useState(true);
    const [char, setChar] = useState(false);
    const [pass, setPass] = useState('');

    // use Ref hook
    const passwordRef = useRef(null);

    const password = useCallback(() => {
        let mypass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (num) str += '0123456789';
        if (char) str += '!@#$%^&*()-_=+[{]}|;:<.>/?';

        for (let i = 1; i <= length; i++) {
            let randomChar = Math.floor(Math.random() * str.length + 1);
            mypass += str.charAt(randomChar);
        }
        setPass(mypass);
    }, [length, num, char, setPass])

    const copyPassword = useCallback(() => {
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(pass)
    }, [pass])

    useEffect(() => {
        password()
    }, [length, num, char, password])

    return (
        <div className="card bg-base-100 md:w-[630px] shadow-md py-2 bordered">
            <div className="font-bold text-2xl md:text-3xl text-center">Password Generator</div>
            <div className="card-body px-4 md:px-8">
                <input type="text" placeholder="Your Password" value={pass} readOnly className="input input-bordered w-full" ref={passwordRef} />
                <button className="btn" onClick={copyPassword}>Copy</button>
                <div className="flex flex-wrap justify-center items-center px-4">
                    <div className="flex flex-1 items-center">
                        <input type="range" min="0" max="100" onChange={(e) => { setLength(e.target.value) }} value={length} className="range range-xs" />
                        <span className="px-2">Length({length})</span>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center px-1">
                            <input type="checkbox" id="numbers" onChange={() => { setNum((pre) => !pre) }} className="checkbox" defaultChecked={num} />
                            <label htmlFor="numbers" className="label cursor-pointer">Numbers</label>
                        </div>
                        <div className="flex items-center px-1">
                            <input type="checkbox" id="characters" defaultChecked={char} onChange={() => { setChar((pre) => !pre) }} className="checkbox" />
                            <label htmlFor="characters" className="label cursor-pointer">Characters</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;