import { useState } from "react";

type ButtonState = 'DEFAULT' | "SELECTED" | "WRONG";
type Option = {
    value: string,
    state: ButtonState,
};

function randomize() {
    return Math.random() - 0.5;
}

const CountryCapitalGame = ({data}:{data: Record<string, string>}) => {

    const countries = Object.keys(data);
    const capitals = Object.values(data);
    const [options, setOptions] = useState<Option[]>
    ([...countries, ...capitals]
        .map(value =>({value, state:"DEFAULT"}))
        .sort(randomize) as Option[]);

    const [selected, setSelected] = useState<Option>();
    const isGameOver = options.length === 0;

    if(isGameOver){
        return <div>Congratulations</div>
    }

  return (
    <div>{options.map((option)=>(
        <button 
        className={option.state === "SELECTED" ? "selected" : option.state === "WRONG" ? "wrong": ''}
        key={option.value}
        onClick={()=>{
            if(!selected){
                setSelected(option);
                setOptions(options.map(opt=>{
                    return opt === option ?{
                        ...opt,
                        state:"SELECTED"
                    } : {...opt, state:"DEFAULT"}
                }));
            }else{
                if(selected.value === data[option.value] || data[selected.value] === option.value) {
                    setOptions(options.filter(opt=>{
                        return !(opt.value === selected.value || opt.value === option.value);
                    }))
                }else{
                    //wrong pair
                    setOptions(options.map(opt=>{
                        return (opt.value === selected.value || opt.value === option.value) ? {...opt, state:'WRONG'}: opt;
                    }))
                }
            setSelected(undefined);
            }
        }
        }>{option.value}</button>
    ))}</div>
  )
}

export default CountryCapitalGame