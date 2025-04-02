import styled from "styled-components";
import { $gender,setGender } from "../store/register-store2";
import { useUnit } from "effector-react";

export const GenderSelector = () => {
    const gender=useUnit($gender)


    return (
        <GenderSwitch>
            <RadioButton selected={gender === "М"} $disabled={gender==='М'}>
                <RadioInput
                    type="radio"
                    checked={gender === "М"}
                    onChange={()=>{setGender('М')}}
                    disabled={gender==='М'}
                />
                Муж
            </RadioButton>

            <RadioButton selected={gender === "Ж"} $disabled={gender==='Ж'}>
                <RadioInput
                    type="radio"
                    checked={gender === "Ж"}
                    onChange={()=>{setGender('Ж')}}
                    disabled={gender==='Ж'}
                />
                Жен
            </RadioButton>
        </GenderSwitch>
    );
};



const GenderSwitch = styled.div`
          display: flex;
          width: 200px;
          gap: 5px;
        `;


const RadioButton = styled.label<{ selected: boolean,$disabled:boolean }>`
          display: inline-block;
          padding: 10px;
          cursor: ${({$disabled})=>$disabled?'defalt':'pointer'};
          border-radius: 5px;
          background-color: ${({ selected }) => (selected ? "#00acc1" : "#ccc")};
          color: ${({ selected }) => (selected ? "#fff" : "#000")};
          text-align: center;
          width: 40px;
        `;

const RadioInput = styled.input`
          display: none;
        `;
