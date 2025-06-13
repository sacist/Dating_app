import styled from "styled-components";

interface InputProps{
    $filled:boolean
    $error:boolean
    $placeholder:string
    $type:string
    $onChange:(e: React.ChangeEvent<HTMLInputElement>)=>void
    $value:string
    onInvalid?:()=>void
    maxLength?:number
}

export const Input=({$filled,$error,$placeholder,$type,$onChange,$value,onInvalid,maxLength}:InputProps) => {
    return(
        <StyledInput 
        $filled={$filled} 
        $error={$error}
        placeholder={$placeholder}
        type={$type}
        onChange={$onChange}
        value={$value}
        onInvalid={onInvalid}
        maxLength={maxLength}
        />
    )
}


const StyledInput = styled.input<{ $filled: boolean, $error: boolean }>`
  border-radius: 4px;
  font-size: 20px;
  padding: 14px;
  width: 390px;
  background-color: ${({ $filled }) => ($filled ? "#e0f7fa" : "#fff")};
  background-color: ${({ $error }) => $error && '#fddcdc'};
  border: 2px solid ${({ $filled }) => ($filled ? "#00acc1" : "#ccc")};
  border:${({ $error }) => $error && '2px solid #c42700'};
  transition: background-color 0.3s, border-color 0.3s;
  margin-bottom: 20px;
`;